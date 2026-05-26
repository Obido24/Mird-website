"use client";

import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { resourceConfigs, type FieldConfig, type ResourceConfig } from '@/lib/admin-config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/components/ui/table';

type ResourceRow = {
  id: string;
  [key: string]: unknown;
};

function getEmptyValue(field: FieldConfig) {
  if (field.type === 'checkbox') return false;
  if (field.type === 'number') return 0;
  if (field.type === 'lines') return '';
  return '';
}

function buildInitialForm(config: ResourceConfig, record?: ResourceRow | null) {
  const initial: Record<string, unknown> = {};
  for (const field of config.fields) {
    initial[field.name] = record?.[field.name] ?? getEmptyValue(field);
  }
  return initial;
}

function formatValue(field: FieldConfig, value: unknown) {
  if (field.type === 'checkbox') {
    return Boolean(value) ? 'Yes' : 'No';
  }

  if (field.type === 'lines') {
    return Array.isArray(value) ? value.join(', ') : String(value ?? '');
  }

  return String(value ?? '');
}

function toPayload(fields: FieldConfig[], form: Record<string, unknown>) {
  const payload: Record<string, unknown> = {};
  for (const field of fields) {
    const value = form[field.name];
    if (field.type === 'checkbox') {
      payload[field.name] = Boolean(value);
    } else if (field.type === 'number') {
      payload[field.name] = Number(value ?? 0);
    } else if (field.type === 'lines') {
      if (Array.isArray(value)) {
        payload[field.name] = value.map((item) => String(item).trim()).filter(Boolean);
      } else {
        payload[field.name] = String(value ?? '')
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean);
      }
    } else {
      payload[field.name] = String(value ?? '');
    }
  }
  return payload;
}

function validateForm(fields: FieldConfig[], form: Record<string, unknown>) {
  for (const field of fields) {
    if (!field.required) {
      continue;
    }

    const value = form[field.name];
    if (field.type === 'checkbox') {
      if (!value) {
        return `${field.label} must be enabled.`;
      }
      continue;
    }

    if (field.type === 'lines') {
      const items = Array.isArray(value)
        ? value
        : String(value ?? '')
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean);
      if (items.length === 0) {
        return `${field.label} cannot be empty.`;
      }
      continue;
    }

    if (String(value ?? '').trim().length === 0) {
      return `${field.label} cannot be empty.`;
    }
  }

  return null;
}

export function ResourceManager({ resourceKey }: { resourceKey: keyof typeof resourceConfigs }) {
  const config = resourceConfigs[resourceKey];
  const [records, setRecords] = useState<ResourceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ResourceRow | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<Record<string, unknown>>(buildInitialForm(config));

  async function loadRecords() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/${config.collection}`, {
        cache: 'no-store'
      });
      const payload = (await response.json().catch(() => null)) as { records?: ResourceRow[]; error?: string } | null;

      if (!response.ok) {
        throw new Error(payload?.error ?? 'Unable to load live records.');
      }

      setRecords(payload?.records ?? []);
    } catch (loadError) {
      setRecords([]);
      setError(loadError instanceof Error ? loadError.message : 'Unable to load live records.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.collection]);

  useEffect(() => {
    if (selected) {
      setForm(buildInitialForm(config, selected));
    }
  }, [config, selected]);

  function openCreate() {
    setSelected(null);
    setForm(buildInitialForm(config));
    setError('');
    setIsOpen(true);
  }

  function openEdit(record: ResourceRow) {
    setSelected(record);
    setForm(buildInitialForm(config, record));
    setError('');
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelected(null);
    setError('');
  }

  async function handleSave() {
    const validationError = validateForm(config.fields, form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setSaving(true);
    try {
      const payload = toPayload(config.fields, form);
      const url = selected ? `/api/admin/${config.collection}/${selected.id}` : `/api/admin/${config.collection}`;
      const response = await fetch(url, {
        method: selected ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const responsePayload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(responsePayload?.error ?? 'Unable to save this record right now.');
      }

      closeModal();
      await loadRecords();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save this record right now.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(record: ResourceRow) {
    if (!window.confirm(`Delete ${record.id}?`)) return;

    try {
      const response = await fetch(`/api/admin/${config.collection}/${record.id}`, {
        method: 'DELETE'
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(payload?.error ?? 'Unable to delete this record right now.');
      }

      await loadRecords();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete this record right now.');
    }
  }

  const columns = config.columns;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="items-start">
          <div>
            <p className="eyebrow">Admin Resource</p>
            <CardTitle className="mt-3 text-3xl">{config.title}</CardTitle>
            <CardDescription className="mt-2">{config.description}</CardDescription>
          </div>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            {config.createLabel}
          </Button>
        </CardHeader>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {error ? <p className="m-4 rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p> : null}
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <tr>
                  {columns.map((column) => (
                    <TableHeadCell key={column.key}>{column.label}</TableHeadCell>
                  ))}
                  <TableHeadCell>Actions</TableHeadCell>
                </tr>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1}>Loading live records...</TableCell>
                  </TableRow>
                ) : null}
                {!loading && records.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1}>No live records found.</TableCell>
                  </TableRow>
                ) : null}
                {records.map((record) => (
                  <TableRow key={record.id}>
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {column.render
                          ? column.render(record[column.key], record)
                          : formatValue(
                              config.fields.find((field) => field.name === column.key) ?? config.fields[0],
                              record[column.key]
                            )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" onClick={() => openEdit(record)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(record)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Modal
        open={isOpen}
        title={selected ? `Edit ${config.title}` : config.createLabel}
        description={config.description}
        onClose={closeModal}
      >
        <div className="space-y-4">
          {error ? <p className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p> : null}
          {config.fields.map((field) => (
            <div key={field.name}>
              {(() => {
                const currentValue = form[field.name];

                return (
                  <>
              <label className="label" htmlFor={field.name}>
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={field.name}
                  value={String(currentValue ?? '')}
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                  placeholder={field.placeholder}
                />
              ) : field.type === 'select' ? (
                <Select
                  id={field.name}
                  value={String(currentValue ?? '')}
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                >
                  <option value="">Select option</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              ) : field.type === 'checkbox' ? (
                <div className="flex items-center gap-3 rounded-xl border border-line/50 bg-surface/80 px-4 py-3">
                  <input
                    id={field.name}
                    type="checkbox"
                    checked={Boolean(currentValue)}
                    onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.checked }))}
                  />
                  <span className="text-sm text-muted">{field.helperText ?? field.label}</span>
                </div>
              ) : field.type === 'number' ? (
                <Input
                  id={field.name}
                  type="number"
                  value={String(currentValue ?? '')}
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                  placeholder={field.placeholder}
                />
              ) : field.type === 'lines' ? (
                <Textarea
                  id={field.name}
                  value={String(Array.isArray(currentValue) ? currentValue.join('\n') : currentValue ?? '')}
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                  placeholder={field.placeholder ?? 'One item per line'}
                />
              ) : (
                <Input
                  id={field.name}
                  value={String(currentValue ?? '')}
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                  placeholder={field.placeholder}
                />
              )}
              {field.helperText ? <p className="mt-2 text-xs text-muted">{field.helperText}</p> : null}
                  </>
                );
              })()}
            </div>
          ))}
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

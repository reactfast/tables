# @reactfast/tables

Declarative data tables for React. Part of the @reactfast ecosystem alongside @reactfast/forms and @reactfast/nav.

## Philosophy
- Consumer provides data + column config, component does the rest
- Full width, full height — consumer controls the container
- Tailwind styled, themeable via props
- No external dependencies beyond React
- Client component ('use client')

## API

```jsx
import { DataTable } from '@reactfast/tables'

<DataTable
  data={rows}
  columns={[
    { name: 'id', title: 'ID', width: '80px' },
    { name: 'name', title: 'Name' },
    { name: 'status', title: 'Status', render: (val) => <Badge>{val}</Badge> },
    { name: 'created_at', title: 'Created', render: (val) => formatDate(val) },
  ]}
  actions={[
    { icon: <PencilIcon className="h-4 w-4" />, onClick: (row) => edit(row), title: 'Edit' },
    { icon: <TrashIcon className="h-4 w-4" />, onClick: (row) => delete(row), title: 'Delete' },
  ]}
  onRowClick={(row) => router.push(`/item/${row.id}`)}
  itemsPerPage={10}
  searchable={true}
  searchPlaceholder="Search..."
  loading={false}
  emptyMessage="No items found"
  theme={{ accentColor: '#020DF9' }}
/>
```

## Structure
- Search bar: top, full width
- Table: fills remaining height, scrollable
- Headers: sticky, sortable
- Pagination: bottom, full width

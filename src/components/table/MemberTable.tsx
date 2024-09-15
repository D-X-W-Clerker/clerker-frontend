import React from 'react';
import styled from 'styled-components';
import { useTable, Column } from 'react-table';

/* eslint-disable react/jsx-props-no-spreading */

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  font-size: 10px;
`;

const Th = styled.th`
  border-top: 0.5px solid #b6b6b6;
  border-bottom: 0.5px solid #b6b6b6;
  border-right: 0.5px solid #b6b6b6;
  padding: 5px;
  font-weight: var(--font-medium);
  text-align: left;
  color: #707070;

  &:last-child {
    border-right: none;
  }
`;

const Td = styled.td`
  border-bottom: 0.5px solid #b6b6b6;
  border-right: 0.5px solid #b6b6b6;
  padding: 5px;
  color: #3a3a3a;

  &:last-child {
    border-right: none;
  }
`;

interface MemberTableProps {
  data: { name: string; role: string; email: string; contact: string }[];
}

const columns: Column<{
  name: string;
  role: string;
  email: string;
  contact: string;
}>[] = [
  { Header: '이름', accessor: 'name' },
  { Header: '업무', accessor: 'role' },
  { Header: '이메일', accessor: 'email' },
  { Header: '연락처', accessor: 'contact' },
];

const MemberTable: React.FC<MemberTableProps> = ({ data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          return (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <Th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </Th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default MemberTable;

import React from 'react';
import styled from 'styled-components';
import { useTable, Column } from 'react-table';

/* eslint-disable react/jsx-props-no-spreading */

// -- 인터페이스 --
interface MemberTableProps {
  data: {
    id: string;
    name: string;
    role: string;
    email: string;
    contact: string;
  }[];
}

// -- 스타일 컴포넌트 --
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  font-size: 10px;
`;

const Th = styled.th`
  border: 0.5px solid var(--color-gray-300);
  border-left: none;
  padding: 5px;
  font-weight: var(--font-medium);
  text-align: left;
  color: var(--color-gray-500);

  &:last-child {
    border-right: none;
  }
`;

const Td = styled.td`
  border-bottom: 0.5px solid var(--color-gray-300);
  border-right: 0.5px solid var(--color-gray-300);
  padding: 5px;
  color: var(--color-gray-600);

  &:last-child {
    border-right: none;
  }
`;

const columns: Column<{
  id: string;
  name: string;
  role: string;
  email: string;
  contact: string;
}>[] = [
  { Header: '이름', accessor: 'name', id: 'name' },
  { Header: '업무', accessor: 'role', id: 'role' },
  { Header: '이메일', accessor: 'email', id: 'email' },
  { Header: '연락처', accessor: 'contact', id: 'contact' },
];

const MemberTable: React.FC<MemberTableProps> = ({ data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<{
      id: string;
      name: string;
      role: string;
      email: string;
      contact: string;
    }>({ columns, data });

  return (
    <Table {...getTableProps()}>
      {/* 테이블 헤더 */}
      <thead>
        {headerGroups.map((headerGroup) => {
          return (
            // 헤더 그룹에 고유한 key 를 부여하여 렌더링
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={`headerGroup-${headerGroup.headers
                .map((header) => {
                  return header.id; // 각 헤더의 id를 결합해 고유한 key 로 사용
                })
                .join('-')}`}
            >
              {headerGroup.headers.map((column) => {
                return (
                  // 각 헤더 셀(Th)에 고유한 key 부여 및 헤더 내용 렌더링
                  <Th {...column.getHeaderProps()} key={column.id}>
                    {column.render('Header')}
                  </Th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      {/* 테이블 바디 */}
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row); // 각 행 준비
          return (
            // 각 행(row)에 고유한 key 로 row.original.id를 사용하여 렌더링 (data 에 있는 id)
            <tr {...row.getRowProps()} key={row.original.id}>
              {row.cells.map((cell) => {
                return (
                  // 각 셀(Td)에 고유한 key 부여 및 셀 데이터 렌더링
                  <Td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </Td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default MemberTable;

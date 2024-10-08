import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTable, Column, CellProps } from 'react-table';
import { DownArrowIcon } from '@assets';
import { ItemsCenterRow } from '@styles';

/* eslint-disable react/jsx-props-no-spreading */

// -- 인터페이스 --
interface Member {
  id: string;
  name: string;
  role: string | null;
  email: string;
  permission: string;
}

interface MemberEditTableProps {
  data: Member[];
  onChangeRole: (id: string, newRole: string) => void;
}

// -- 스타일 컴포넌트 --
const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  ::-webkit-scrollbar {
    height: 0;
    background: transparent;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const SelectContainer = styled(ItemsCenterRow)``;

const Table = styled.table`
  width: 100%;
  min-width: 350px;
  border-collapse: collapse;
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
  white-space: nowrap;
  border-bottom: 0.5px solid var(--color-gray-300);
  border-right: 0.5px solid var(--color-gray-300);
  padding: 5px;
  color: var(--color-gray-600);
  &:last-child {
    border-right: none;
  }
`;

const RoleLabel = styled.span<{ $bgColor: string }>`
  padding: 5px 8px;
  background-color: ${(props): string => {
    return props.$bgColor;
  }};
  color: #000;
  border-radius: 5px;
  margin-right: 10px;
`;

const CustomSelect = styled.select`
  border: 1px solid var(--color-gray-300);
  border-radius: 5px;
  padding: 5px;
  font-size: 10px;
`;

const roleOptions = ['PM', 'FE', 'BE', 'DE', 'AI'];

const roleColorMap: { [key: string]: string } = {
  DE: 'var(--color-de)',
  FE: 'var(--color-fe)',
  BE: 'var(--color-be)',
  PM: 'var(--color-pm)',
  AI: 'var(--color-ai)',
};

const SelectCell: React.FC<{
  id: string;
  value: string | null;
  onChangeRole: (id: string, newRole: string) => void;
}> = ({ id, value, onChangeRole }) => {
  const roleColor = value ? roleColorMap[value] : '#f3f4f6';

  return (
    <SelectContainer>
      {/* <RoleLabel $bgColor={roleColor}>{value || '선택'}</RoleLabel> */}
      <CustomSelect
        value={value || ''}
        onChange={(e): void => {
          onChangeRole(id, e.target.value);
        }}
      >
        {roleOptions.map((role) => {
          return (
            <option key={role} value={role}>
              {role}
            </option>
          );
        })}
      </CustomSelect>
    </SelectContainer>
  );
};

const RoleCell = (
  onChangeRole: (id: string, newRole: string) => void,
): React.FC<CellProps<Member, string | null>> => {
  return ({ row, value }) => {
    return (
      <SelectCell
        id={row.original.id}
        value={value}
        onChangeRole={onChangeRole}
      />
    );
  };
};

const MemberEditTable: React.FC<MemberEditTableProps> = ({
  data,
  onChangeRole,
}) => {
  // useMemo를 사용하여 columns를 캐싱
  const columns = useMemo((): Column<Member>[] => {
    return [
      { Header: '이름', accessor: 'name', id: 'name' },
      {
        Header: '업무',
        accessor: 'role',
        id: 'role',
        Cell: RoleCell(onChangeRole), // 함수 외부로 분리한 RoleCell 사용
      },
      { Header: '이메일', accessor: 'email', id: 'email' },
      { Header: '권한', accessor: 'permission', id: 'permission' },
    ];
  }, [onChangeRole]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Member>({ columns, data });

  return (
    <Container>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={`headerGroup-${headerGroup.headers
                  .map((header) => {
                    return header.id;
                  })
                  .join('-')}`}
              >
                {headerGroup.headers.map((column) => {
                  return (
                    <Th {...column.getHeaderProps()} key={column.id}>
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
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => {
                  return (
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
    </Container>
  );
};

export default MemberEditTable;
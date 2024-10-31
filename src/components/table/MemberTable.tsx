import React from 'react';
import styled from 'styled-components';
import { useTable, Column } from 'react-table';

/* eslint-disable react/jsx-props-no-spreading */

// -- 인터페이스 --
interface MemberTableProps {
    data: {
        organizationId: string;
        username: string;
        email: string;
        type: string | null;
        role: string;
    }[];
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

const TextWithBackground = styled.div<{ $roleColor?: string }>`
    display: inline-block;
    background-color: ${(props): string => {
        return props.$roleColor || 'transparent';
    }};
    padding: 2px 5px;
    border-radius: 4px;
`;

const roleColorMap: { [key: string]: string } = {
    PM: 'var(--color-pm)',
    FE: 'var(--color-fe)',
    BE: 'var(--color-be)',
    DE: 'var(--color-de)',
    AI: 'var(--color-ai)',
};

const columns: Column<{
    organizationId: string;
    username: string;
    email: string;
    type: string | null;
    role: string;
}>[] = [
    { Header: '이름', accessor: 'username', id: 'username' },
    { Header: '업무', accessor: 'type', id: 'type' },
    { Header: '이메일', accessor: 'email', id: 'email' },
    { Header: '권한', accessor: 'role', id: 'role' },
];

const MemberTable: React.FC<MemberTableProps> = ({ data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable<{
            organizationId: string;
            username: string;
            email: string;
            type: string | null;
            role: string;
        }>({ columns, data });

    return (
        <Container>
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
                                        <Th
                                            {...column.getHeaderProps()}
                                            key={column.id}
                                        >
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
                            <tr
                                {...row.getRowProps()}
                                key={row.original.organizationId}
                            >
                                {row.cells.map((cell) => {
                                    // type 컬럼일 때만 배경색 적용
                                    const isRoleColumn =
                                        cell.column.id === 'type';
                                    const roleColor = isRoleColumn
                                        ? roleColorMap[cell.value]
                                        : undefined;
                                    return (
                                        // 각 셀(Td)에 고유한 key 부여 및 셀 데이터 렌더링
                                        <Td
                                            {...cell.getCellProps()}
                                            key={cell.column.id}
                                        >
                                            {isRoleColumn ? (
                                                <TextWithBackground
                                                    $roleColor={roleColor}
                                                >
                                                    {cell.render('Cell')}
                                                </TextWithBackground>
                                            ) : (
                                                cell.render('Cell') // role 컬럼이 아닐 경우 기존 디자인 유지
                                            )}
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

export default MemberTable;

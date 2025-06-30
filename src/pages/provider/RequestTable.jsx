import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
} from "@mui/material";

const columns = [
  { id: "name", label: "Customer", minWidth: 150 },
  { id: "service", label: "Service", minWidth: 150 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
];

const rows = [
  { name: "John Doe", service: "Plumbing", date: "May 18", status: "Pending" },
  { name: "Jane Smith", service: "Cleaning", date: "May 17", status: "Completed" },
  { name: "Ali Khan", service: "Electrician", date: "May 16", status: "Pending" },
  { name: "Anita Desai", service: "Tutoring", date: "May 15", status: "Completed" },
];

const statusChip = (status) => {
  const color = status === "Pending" ? "warning" : "success";
  return <Chip label={status} color={color} size="small" />;
};

const RequestTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 4, borderRadius: 3 }}>
      <TableContainer sx={{ maxHeight: 350 }}>
        <Table stickyHeader aria-label="request table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth, fontWeight: 600 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {column.id === "status" ? statusChip(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default RequestTable;

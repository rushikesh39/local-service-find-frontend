import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  MenuItem,
  Tooltip,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { SyncLoader } from "react-spinners";
import { Check, Clock, XCircle, LoaderCircle, Search } from "lucide-react";
import { getProviderBookings, updateBookingStatus } from "../../api/auth";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const statuses = ["pending", "confirmed", "completed", "cancelled"];

const ProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getProviderBookings();
      setBookings(res);
      setFiltered(sortBookings(res, sortOrder));
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      const updated = bookings.map((b) =>
        b._id === bookingId ? { ...b, status: newStatus } : b
      );
      setBookings(updated);
      filterBookings(search, dateFilter, statusFilter, updated);
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const sortBookings = (data, order) => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const filterBookings = (
    searchText,
    date,
    status,
    source = bookings,
    order = sortOrder
  ) => {
    const lower = searchText.toLowerCase();
    const result = source.filter((booking) => {
      const matchesSearch =
        booking.userId?.name?.toLowerCase().includes(lower) ||
        booking.serviceId?.name?.toLowerCase().includes(lower);

      const matchesDate = date
        ? new Date(booking.scheduledDate).toISOString().split("T")[0] === date
        : true;

      const matchesStatus = status ? booking.status === status : true;

      return matchesSearch && matchesDate && matchesStatus;
    });

    setFiltered(sortBookings(result, order));
  };

  const handleSearch = (value) => {
    setSearch(value);
    filterBookings(value, dateFilter, statusFilter);
  };

  const handleDateFilter = (value) => {
    setDateFilter(value);
    filterBookings(search, value, statusFilter);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    filterBookings(search, dateFilter, value);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setFiltered(sortBookings(filtered, value));
  };

  const handleExportExcel = () => {
    const data = filtered.map((booking) => ({
      User: booking.userId?.name || "N/A",
      Service: booking.serviceId?.name || "N/A",
      "Scheduled Date": new Date(booking.scheduledDate).toLocaleString(),
      Address: booking.address,
      Status: booking.status,
      "Updated At": new Date(booking.updatedAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, "Provider_Bookings.xlsx");
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Paper className="p-4 mb-4">
      <Typography variant="h5" gutterBottom>
        My Bookings
      </Typography>

      <Box className="flex flex-col sm:flex-row gap-4 mb-4 items-center justify-between">
        <TextField
          variant="outlined"
          label="Search by User or Service"
          size="small"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{ endAdornment: <Search size={18} /> }}
        />

        <TextField
          variant="outlined"
          label="Filter by Date"
          type="date"
          size="small"
          value={dateFilter}
          onChange={(e) => handleDateFilter(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          select
          label="Filter by Status"
          variant="outlined"
          size="small"
          value={statusFilter}
          onChange={(e) => handleStatusFilter(e.target.value)}
          InputLabelProps={{ shrink: true }}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => (selected ? selected : "All"),
          }}
          style={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              <Box className="flex items-center gap-1 capitalize">
                {status === "pending" && <Clock size={14} />}
                {status === "confirmed" && <Check size={14} />}
                {status === "completed" && <LoaderCircle size={14} />}
                {status === "cancelled" && <XCircle size={14} />}
                {status}
              </Box>
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Sort by Updated Date"
          variant="outlined"
          size="small"
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
          style={{ minWidth: 180 }}
        >
          <MenuItem value="desc">Latest First</MenuItem>
          <MenuItem value="asc">Oldest First</MenuItem>
        </TextField>

        <Button variant="contained" onClick={handleExportExcel}>
          Export to Excel
        </Button>
      </Box>

      {loading ? (
        <Box className="flex justify-center items-center min-h-[300px]">
          <SyncLoader color="#2563eb" />
        </Box>
      ) : filtered.length === 0 ? (
        <Typography>No bookings found.</Typography>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell>User</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Scheduled Date</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell>{booking.userId?.name || "N/A"}</TableCell>
                      <TableCell>{booking.serviceId?.name || "N/A"}</TableCell>
                      <TableCell>
                        {new Date(booking.scheduledDate).toLocaleString()}
                      </TableCell>
                      <TableCell>{booking.address}</TableCell>
                      <TableCell className="capitalize">
                        {booking.status}
                      </TableCell>
                      <TableCell>
                        {new Date(booking.updatedAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <TextField
                          select
                          value={booking.status}
                          onChange={(e) =>
                            handleStatusChange(booking._id, e.target.value)
                          }
                          size="small"
                        >
                          {statuses.map((status) => (
                            <MenuItem key={status} value={status}>
                              <Box className="flex items-center gap-1">
                                {status === "pending" && <Clock size={14} />}
                                {status === "confirmed" && <Check size={14} />}
                                {status === "completed" && (
                                  <LoaderCircle size={14} />
                                )}
                                {status === "cancelled" && (
                                  <XCircle size={14} />
                                )}
                                {status}
                              </Box>
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      )}
    </Paper>
  );
};

export default ProviderBookings;

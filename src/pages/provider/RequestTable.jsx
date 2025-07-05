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
} from "@mui/material";
import { SyncLoader } from "react-spinners";
import { Check, Clock, XCircle, LoaderCircle, Search } from "lucide-react";
import { todaysBookings } from "../../api/auth"; // Replace with your API path

const statuses = ["pending", "confirmed", "completed", "cancelled"];

const RequestTable = () => {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await todaysBookings();
      setBookings(res);
      setFiltered(res);
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      // Add your API call to update status here
      console.log(`Update booking ${bookingId} to ${newStatus}`);
      const updated = bookings.map((b) =>
        b._id === bookingId ? { ...b, status: newStatus } : b
      );
      setBookings(updated);
      filterBookings(search, dateFilter, statusFilter, updated);
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const filterBookings = (searchText, date, status, source = bookings) => {
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

    setFiltered(result);
  };

  const handleSearch = (value) => {
    setSearch(value);
    filterBookings(value, dateFilter, statusFilter);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    filterBookings(search, dateFilter, value);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Paper className="p-4">
      <Typography variant="h5" gutterBottom>
        Todays Bookings
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
          select
          label="Filter by Status"
          variant="outlined"
          size="small"
          value={statusFilter}
          onChange={(e) => handleStatusFilter(e.target.value)}
          InputLabelProps={{ shrink: true }}
          SelectProps={{
            displayEmpty: true, // ensures empty label works properly
            renderValue: (selected) => {
              return selected ? selected : "All";
            },
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

export default RequestTable;

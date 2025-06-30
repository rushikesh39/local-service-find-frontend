import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { getServices, deleteServices } from "../../api/auth";
import { useSelector } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import { Pencil,Trash2  } from "lucide-react";


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
  Button,
  Typography,
  Tooltip,
} from "@mui/material";

const Services = () => {
  const navigate = useNavigate();
  const providerId = useSelector((state) => state.user.user?.id);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices(providerId);
        setServices(data.services);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [providerId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteServices(id);
      setServices((prev) => prev.filter((service) => service._id !== id));
      alert("Service deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete service.");
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <SyncLoader color="#2563eb" size={15} />
      </div>
    );
  }

  return (
    <div className="p-4 min-h-[70vh] bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5" fontWeight="bold">
          My Services
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={NavLink}
          to="add-new-service"
        >
          + Add New Service
        </Button>
      </div>

      {services.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No services found. Click "Add New Service" to get started.
        </Typography>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price (₹)</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((service) => (
                    <TableRow hover key={service._id}>
                      <TableCell>
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-16 h-16 object-cover rounded border"
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={service.description || "No description"}>
                          <span>{service.name}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell>{service.price}</TableCell>
                      <TableCell>{service.location}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => navigate(`update/${service._id}`)}
                        >
                          <Pencil className="w-5 h-5 text-blue-600 cursor-pointer" />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(service._id)}
                        >
                          <Trash2 className="w-5 h-5 text-red-600 cursor-pointer" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={services.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      )}
    </div>
  );
};

export default Services;

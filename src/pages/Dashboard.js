import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'nida', label: 'Nida Number', minWidth: 250 },
  { id: 'firstname', label: 'First Name', minWidth: 150 },
  { id: 'lastname', label: 'Last Name', minWidth: 150 },
  { id: 'gender', label: 'Gender', minWidth: 10 },
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'phonenumber', label: 'PhoneNumber', minWidth: 20 },
  { id: 'district', label: 'District', minWidth: 150 },
  { id: 'ward', label: 'Ward', minWidth: 150 },
  { id: 'streetname', label: 'Street Name', minWidth: 150 },
  { id: 'housenumber', label: 'House Number', minWidth: 50 },
];

function createData(nida, firstname, lastname, gender, email, phonenumber, district, ward, streetname, housenumber) {
  return { nida, firstname, lastname, gender, email, phonenumber, district, ward, streetname, housenumber };
}

const rows = [
  createData('12345678901234567890',
    'Michael',
    'Michael',
    'M',
    'michaelmichael@gmail.com',
    '0732457698',
    'Ilala',
    'Tabata',
    'Tabata shule',
    '85'),

  createData('34535353564665637890',
    'Sanel',
    'Sanel',
    'M',
    'sanelsanel@anything.gmail',
    '0765477698',
    'Ilala',
    'Karume',
    'Karume',
    '5')

];

export default function Dashboard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [citizens, setCitizens] = React.useState([]);
  const navigate = useNavigate()
  const handleClick = (id) => navigate('/edit/' + id);


  React.useEffect(() => {
    let c = localStorage.getItem('citizen_id')
    let url = 'http://127.0.0.1:8000/app/get_all_citizens'
    let is_admin = localStorage.getItem('is_admin')
    if (is_admin != 'true') {
      url = url + '?c=' + c
    }
 
    console.log(is_admin == 'true')
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        // "authorization":`Bearer ${token}`
      }
    }).then((res) => res.json()).then(
      (data) => {
        setCitizens(data)
        console.log(data);
      }
    )
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {citizens
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" key={row.id}>
                    <TableCell>{row.nida}</TableCell>
                    <TableCell>{row.firstname}</TableCell>
                    <TableCell>{row.lastname}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone_no}</TableCell>
                    <TableCell>{row.wilaya}</TableCell>
                    <TableCell>{row.kata}</TableCell>
                    <TableCell>{row.mtaa}</TableCell>
                    <TableCell>{row.house_no}</TableCell>
                    <TableCell>
                      <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => {
                        handleClick(row.id)
                      }}
                    >
                      Edit
                    </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      //onClick={navigate("/SignIn")}
      >
        Sign Out
      </Button>
    </Paper>
  );
}
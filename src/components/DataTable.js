import React, { useState } from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import DatatableHead from "./DatatableHead";
import DatatableToolbar from "./DatatableToolbar";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router";
import api from "../services/api";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchBar from "material-ui-search-bar";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {

  if(!array){
    return;
  }

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({
  rowsTable,
  headCellsTable,
  nameTable,
  nameEntityApi = null,
  itemsPerPage = null,
  setItemsPerPage = null,
  linkNextPage = null,
  linkPrevPage = null,
  totalRecords = null,
  functionNextPage = null,
  currentPage = null
}) {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(currentPage);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage ? itemsPerPage : 5);
  const [rows, setRows] = useState(rowsTable);
  const [headCells, setHeadCells] = useState(headCellsTable);
  const [nameEntity, setNameEntity] = useState(nameTable);
  const [openDialog, setOpenDialog] = useState(false);
  const [idEntityOperation, setIdEntityOperation] = useState(null);
  const [searched, setSearched] = useState("");
  const history = useHistory();
  let { path, url } = useRouteMatch();

  console.log("headcells datatable: ", rows, headCells);

  const requestSearch = async (searchedVal) => {
    const valueSearch = searchedVal.toLowerCase()
    if(valueSearch.trim()){
      const { data } = await api.get(`${nameEntityApi}/${valueSearch}`);
      console.log('dataSearchDataTable: ', data)
      setRows(data.teachers)
    }else{
      setRows(rowsTable)
    }
    
    // const filteredRows = rowsTable.filter((row) => {
    //   return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    // });
    // setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    if(newPage >= 1){
      functionNextPage(linkNextPage)
      setPage(currentPage+1);
    }else if(newPage < 1){
      functionNextPage(linkPrevPage)
      setPage(currentPage-1);
    }
    
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    if(setItemsPerPage){
      setItemsPerPage(parseInt(event.target.value, 10));
    }
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target);
  };

  const handleClickEdit = async (event) => {
    console.log('edit target event', event.currentTarget.value);
    const idEntity = event.currentTarget.value;
    history.push(`${path}/edit/${idEntity}`);
  }
  
  const handleClickRemove = async (event) => {
    const idEntity = event.currentTarget.value;
    setIdEntityOperation(idEntity)
    setOpenDialog(true)
  }

  const handleConfirmRemove = async () => {
    const { data } = await api.delete(`/remove/${nameEntityApi}/${idEntityOperation}`);
    // history.push(`${path}`);
    window.location.reload();
  }

  const handleClose = () => {
    setOpenDialog(false);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <SearchBar
          placeholder={'Pesquisa'}
          value={searched}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log('do validate', e.target.value)
              requestSearch(e.target.value)
            }
          }}
          // onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <DatatableToolbar
          numSelected={selected.length}
          nameTable={nameEntity}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <DatatableHead
              classes={classes}
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  console.log('row row row:', row);
                  return (
                    <TableRow
                      // hover
                      // onClick={(event) => handleClick(event, row.name)}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      // tabIndex={-1}
                      // key={`${row.name}-${index}`}
                      // selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        {/* <Checkbox
                          onClick={(event) => handleClick(event, row.name)}
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        /> */}
                      </TableCell>
                      {headCells.map((attribute, index) => (
                        <TableCell
                          id={`${labelId}-${attribute}-${index}`}
                          scope="row"
                          padding="none"
                          key={`${labelId}-${attribute}-${index}`}
                        >
                          {row[attribute.id]}
                        </TableCell>
                      ))}
                      <TableCell padding="none">
                          <Button key={`edit-${row.id}`} value={row.id} onClick={(evt) => handleClickEdit(evt)}><EditIcon /></Button>
                      </TableCell>
                      <TableCell padding="none">
                          <Button key={`remove-${row.id}`} value={row.id} onClick={(evt) => handleClickRemove(evt)}><DeleteIcon /></Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={"Linhas por página"}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirme a exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Deseja realmente excluir esse registro? Todas as informações relacionadas serão deletadas
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmRemove} color="primary" autoFocus>
            Sim
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Não
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import moment from "moment";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import "./styles.css";
import countryApi from "../../api/countryApi";

const defaultValue = {
  country: {
    Country: "Viet Nam",
    Slug: "vietnam",
    ISO2: "VN",
  },
  from: moment().subtract(5, "days"),
  to: moment(),
};
//console.log(defaultValue);
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function CountryList() {
  const classes = useStyles();

  const [countryList, setCountryList] = useState([]);
  useEffect(() => {
    async function fetchCountries() {
      try {
        const arr = await Promise.all([
          countryApi.getAllCountry(),
          search(defaultValue.country, defaultValue.from, defaultValue.to),
        ]);
        setCountryList(arr[0]);
      } catch (error) {
        console.log("Failed:", error.message);
        alert(error.message);
      }
    }
    fetchCountries();
  }, []);

  const [country, setCountry] = useState(defaultValue.country);
  const [from, setSelectedFromDate] = useState(defaultValue.from);
  const [to, setSelectedToDate] = useState(defaultValue.to);
  const [data, setData] = useState([]);

  async function handleCountryChange(event, values) {
    await setCountry(values || defaultValue.country);
    await search(values || defaultValue.country, from, to);
  }

  async function handleFromDateChange(date) {
    if (date > moment())
      return alert("Không được chọn ngày lớn hơn ngày hiện tại.");
    if (date > moment(to))
      return alert("Không được chọn ngày lớn hơn ngày kết thúc.");
    setSelectedFromDate(date);
    await search(country, date, to);
  }

  async function handleToDateChange(date) {
    if (date > moment())
      return alert("Không được chọn ngày lớn hơn ngày hiện tại.");
    if (date < moment(from))
      return alert("Không được chọn ngày nhỏ hơn ngày bắt đầu.");
    setSelectedToDate(date);
    await search(country, from, date);
  }

  async function search(country, from, to) {
    const params = {
      country: country.Slug,
      from: moment(from).format("YYYY-MM-DD") + "T00:00:00Z",
      to: moment(to).format("YYYY-MM-DD") + "T00:00:00Z",
    };
    try {
      const res = await countryApi.getByCountryAllStatus(params);
      setData(res);
    } catch (error) {
      console.log("Failed:", error.message);
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    await search(country, from, to);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="frmFilter">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Autocomplete
                id="cbb__countries"
                name="country"
                options={countryList}
                value={country}
                getOptionLabel={(option) => option.Country}
                getOptionSelected={(option) => option.Country}
                onChange={handleCountryChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nhập hoặc chọn quốc gia"
                    variant="outlined"
                    value="vietnam"
                  />
                )}
              />
            </Grid>
            <Grid item md={3} xs={5}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                id="date-picker-from"
                name="from"
                label="Từ ngày"
                value={from}
                onChange={handleFromDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                autoOk="true"
              />
            </Grid>
            <Grid item md={3} xs={5}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                id="date-picker-to"
                name="to"
                label="Đến ngày"
                value={to}
                onChange={handleToDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                autoOk="true"
              />
            </Grid>
            <Grid item md={2} xs={2}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                className="btnSearch"
              >
                Tìm kiếm
              </Button>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Ngày</TableCell>
              <TableCell align="center" className="cellHeader--gray">
                Tổng số ca nhiễm
              </TableCell>
              <TableCell align="center" className="cellHeader--blue">
                Đang điều trị
              </TableCell>
              <TableCell align="center" className="cellHeader--green">
                Đã khỏi bệnh
              </TableCell>
              <TableCell align="center" className="cellHeader--red">
                Số người mất
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center" component="th" scope="row">
                  {moment(item.Date).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="right" className="cellConfirmed">
                  <NumberFormat
                    value={item.Confirmed}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </TableCell>
                <TableCell align="right" className="cellActive">
                  <NumberFormat
                    value={item.Active}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </TableCell>
                <TableCell align="right" className="cellRecovered">
                  <NumberFormat
                    value={item.Recovered}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </TableCell>
                <TableCell align="right" className="cellDeaths">
                  <NumberFormat
                    value={item.Deaths}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CountryList;

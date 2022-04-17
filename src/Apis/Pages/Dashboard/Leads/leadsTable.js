import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getLeads, leadActions } from "../../../Apis";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Router/routes";
import { scrollToTop } from "../../../Helpers/utils";
import AddEditLead from "./addEditLead";
import LeadStatus, {
  filters,
  extraFilters,
} from "../../../Components/Dropdowns/leadStatus";
import LeadActions from "../../../Components/Dropdowns/leadActions";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const dateFormatter = (cell) => moment(cell).format("DD-MMM-YYYY");
const formatDate = (cell) => moment(cell).format("MM/DD/YYYY");

const firstDateOption = "Any time";
const dateRanges = {
  [firstDateOption]: [],
  "Past 24 Hour": [moment().subtract(1, "days"), moment()],
  "Past Week": [moment().subtract(1, "week"), moment()],
  "Past Month": [moment().subtract(1, "month"), moment()],
  "Past Year": [moment().subtract(1, "year"), moment()],
};

const LeadsTable = () => {
  const [data, setData] = useState({ data: [] });
  const [count, setCount] = useState();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [limitPerPage] = useState(10);
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [typeFilter, setTypeFilter] = useState(filters[0].type);
  const [dateFilter, setDateFilter] = useState();
  const [selected, setSelected] = useState([]);
  const [showAction, setShowAction] = useState();
  const [showStatus, setShowStatus] = useState();

  const [dateLabel, setDateLabel] = useState(firstDateOption);
  const navigate = useNavigate();

  useEffect(() => {
    getLeads({
      pageNo: page,
      search,
      type: typeFilter,
      ...dateFilter,
    }).then((res) => {
      setData(res?.data);
      setCount(res?.data?.count);
    });
  }, [success, page, search, typeFilter, dateFilter]);

  const addNewLead = () => {
    setIsEdit(false);
    setEditData(null);
    setModal(true);
  };

  const editLead = (row) => {
    setIsEdit(true);
    setEditData(row);
    setModal(true);
  };

  const onDateFilterChange = (start, end, label) => {
    setDateLabel(label);
    setDateFilter({
      startDate: label !== firstDateOption ? formatDate(start) : undefined,
      endDate: label !== firstDateOption ? formatDate(end) : undefined,
    });
  };

  // on single row select
  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected((prev) => [...prev, row?._id]);
    } else {
      setSelected((prev) => prev.filter((x) => x !== row?._id));
    }
  };

  // on all rows select
  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map((r) => r?._id);
    if (isSelect) {
      setSelected(ids);
    } else {
      setSelected([]);
    }
  };

  const multiActions = (e) => {
    const action = e.target.value;
    const payload = {
      leadIds: selected,
    };
    if (action === "delete") {
      payload.isDeleted = true;
    } else if (action === "archive") {
      payload.archive = true;
    }

    confirmAlert({
      message: `Are you sure you want to ${action} selected leads?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            leadActions(payload).then((res) => {
              toast.success(res?.message);
              setSelected([]);
              setSuccess((s) => !s);
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const selectRow = {
    mode: "checkbox",
    selected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  };

  const noData = () => (
    <Row>
      <Col className="text-center">No leads found.</Col>
    </Row>
  );

  const rowEvents = {
    onClick: (e, row) => {
      navigate(`${ROUTES.LEADS}/${row?._id}`);
      scrollToTop();
    },
  };

  const columns = [
    {
      dataField: "name",
      text: "Client Name",
    },
    {
      dataField: "phoneNumber",
      text: "Contact Number",
    },
    {
      dataField: "city",
      text: "City",
    },
    {
      dataField: "createdAt",
      text: "Create Date",
      formatter: dateFormatter,
    },
    {
      dataField: "leadStatus",
      text: "Status",
      formatter: (status, row) => (
        <LeadStatus
          status={status}
          leadId={row?._id}
          setSuccess={setSuccess}
          show={showStatus}
          onToggle={setShowStatus}
        />
      ),
      events: {
        onClick: (e) => e.stopPropagation(),
      },
    },
    {
      dataField: "updatedAt",
      text: "Action Date",
      formatter: dateFormatter,
    },
    {
      dataField: "-",
      text: "Last Contact",
    },
    {
      dataField: "",
      text: "",
      formatter: (field, row) => (
        <LeadActions
          dots
          lead={row}
          setSuccess={setSuccess}
          onEdit={() => editLead(row)}
          show={showAction}
          onToggle={setShowAction}
        />
      ),
      events: {
        onClick: (e) => e.stopPropagation(),
      },
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-md-12 text-start mt-2 mb-3">
          <div className="lead-plan">
            <h3>Manage Leads</h3>
          </div>
        </div>

        <div className="col-md-6 mange-leadss text-start mb-5">
          <div className="mange-lead d-flex">
            <div className="dash-search">
              <input
                type="search"
                placeholder="Search leads"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="select-box ms-2 interFont">
              <DateRangePicker
                onCallback={onDateFilterChange}
                initialSettings={{
                  ranges: dateRanges,
                  showDropdowns: true,
                }}
              >
                <div className="desktopviwefilter">
                  <div className="mobilefilter">
                    <FontAwesomeIcon icon="filter" />
                  </div>
                  <div className="custom-date-picker">
                    <span>{dateLabel}</span>
                    <FontAwesomeIcon icon="chevron-down" />
                  </div>
                </div>
              </DateRangePicker>
            </div>
          </div>
        </div>
        <div className="col-md-6 mange-leadss text-start mb-5">
          <div className="mange-lead d-flex justify-content-end">
            {extraFilters.map((filter, index) => (
              <div
                className={`snooze ${
                  typeFilter === filter.type ? "snooze-active" : ""
                }`}
                key={index}
                onClick={() => setTypeFilter(filter.type)}
              >
                <span>{filter.label}</span>
                <span>{data?.[filter.key] || 0}</span>
              </div>
            ))}

            <button className="btn btn-get-started" onClick={addNewLead}>
              Add Lead +
            </button>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <div className="mange-lead actives-color d-flex">
            {!!selected.length && (
              <select className="multiActionsDropdown" onChange={multiActions}>
                <option value="">Multi Actions</option>
                <option value="archive">Archive leads</option>
                <option value="delete">Delete leads</option>
              </select>
            )}
            {filters.map((filter, i) => (
              <button
                className={`btn btn-get-started messege ${
                  i !== 0 ? "ms-3" : ""
                } ${typeFilter === filter.type ? "active-change" : ""}`}
                key={i}
                onClick={() => setTypeFilter(filter.type)}
              >
                <span>{filter.label}</span>
                <span className="ms-2">{data?.[filter.key] || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Col md="12" className="table-responsive hideScrollbar">
        <BootstrapTable
          bootstrap4
          hover
          keyField="_id"
          data={data?.data}
          columns={columns}
          bordered={false}
          noDataIndication={noData}
          selectRow={selectRow}
          rowEvents={rowEvents}
          rowClasses="btn-reveal pointer hoverRow"
        />
      </Col>
      <ReactPaginate
        nextLabel=">"
        onPageChange={(e) => setPage(e.selected)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={Math.ceil(count / limitPerPage)}
        initialPage={page}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-end mb-0 invalidFeedback"
        activeClassName="page-active"
        renderOnZeroPageCount={null}
      />
      <AddEditLead
        show={modal}
        setModal={setModal}
        setSuccess={setSuccess}
        isEdit={isEdit}
        editData={editData}
      />
    </>
  );
};

export default LeadsTable;

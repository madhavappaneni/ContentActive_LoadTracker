import React, { useState, useRef, useEffect, useCallback } from "react";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import {
  SelectionState,
  PagingState,
  FilteringState,
  IntegratedFiltering,
  EditingState,
  SearchState,
  CustomPaging,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
  TableFilterRow,
  SearchPanel,
  Toolbar,
  ExportPanel,
  TableEditColumn,
} from "@devexpress/dx-react-grid-bootstrap4";
import { GridExporter } from "@devexpress/dx-react-grid-export";
import { PopUpAssign, Popup } from "./popUpAssign";
import { saveFile } from "../utils/exportUtils";
import { getLoadData } from "../apis/getLoadData";
// Since columns won't change, we don't have to store the configs in the state
import { gridColumns, gridColumnExtensions } from "../config/columnConfigs";

function GridComponent() {
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [selection, setSelection] = useState();
  const [loadSearchQuery, setLoadSearchQuery] = useState("");

  // load grid data from the getLoadData API and populate the grid data
  const setGridData = () => {
    getLoadData({ loadSearchQuery, pageSize, currentPage })
      .then(({ data, totalCount: newTotalCount }) => {
        setRows(data);
        setTotalCount(newTotalCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // update the grid data only when the current page is changed
  useEffect(() => setGridData(), [currentPage]);

  // code to export the grid data
  const exporterRef = useRef(null);
  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  return (
    <div className="container-fluid card load-grid col col-md-10 col-xl-10">
      <div className="grid-title text-uppercase font-weight-bold py-1">
        Loads
      </div>

      {/* refer to the guides for more information on each sub components used  */}
      <Grid rows={rows} columns={gridColumns}>
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <EditingState />
        <SearchState onValueChange={setLoadSearchQuery} defaultValue="" />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
        />
        <CustomPaging totalCount={totalCount} />

        <FilteringState
          defaultFilters={[]}
          columnExtensions={gridColumnExtensions}
        />
        <IntegratedFiltering />

        <Table columnExtensions={gridColumns} />
        <TableEditColumn showEditCommand />
        <TableSelection />
        <TableHeaderRow />
        <TableFilterRow />
        <PagingPanel />
        <Toolbar />
        <SearchPanel />
        <ExportPanel startExport={startExport} />
        <PopUpAssign popupComponent={Popup} />
      </Grid>
      <GridExporter
        ref={exporterRef}
        columns={gridColumns}
        rows={rows}
        selection={selection}
        onSave={saveFile}
      />
    </div>
  );
}

export default GridComponent;

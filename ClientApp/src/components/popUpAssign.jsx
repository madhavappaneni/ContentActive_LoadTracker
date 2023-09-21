import React, { useState } from "react";
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Label,
  FormGroup,
  Input,
} from "reactstrap";
import { assignDriver } from "../apis/assignDriver";

const URL = "/api/drivers";

// I had to follow the tight conventional method that is used by the Devexpress package.
// For more info - https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/editing-in-popup/#react-grid---editing-in-a-popup-form
// Used the popup component from the above url and made changes

export const Popup = ({
  row,
  drivers,
  onQueryChange,
  onAssignDriver,
  selectedDriverName,
  onCancelChanges,
  open,
  onItemClick,
}) => (
  <Modal
    isOpen={Boolean(open)}
    onClose={onCancelChanges}
    aria-labelledby="form-dialog-title"
  >
    <ModalHeader id="form-dialog-title">
      <div className="text-uppercase font-weight-bold py-1">
        Assign a Driver to Load # {row.loadNumber}
      </div>
    </ModalHeader>
    <ModalBody>
      <Container>
        <Row>
          <FormGroup>
            <Label>Select A Driver</Label>
            <Input
              label="Select A Driver"
              value={selectedDriverName}
              onChange={onQueryChange}
            />
          </FormGroup>

          {drivers &&
            drivers.length &&
            drivers.map((driver) => (
              <button
                className={`dropdown-item`}
                onClick={() => onItemClick(driver)}
              >
                {driver.name}
              </button>
            ))}
        </Row>
      </Container>
    </ModalBody>
    <ModalFooter>
      <Button onClick={onCancelChanges} color="secondary">
        Cancel
      </Button>{" "}
      <Button onClick={onAssignDriver} color="primary">
        Assign
      </Button>
    </ModalFooter>
  </Modal>
);

export const PopUpAssign = ({ popupComponent: Popup }) => {
  const [drivers, setDrivers] = useState();
  const [selectedDriverId, setSelectedDriverId] = useState();
  const [selectedDriverName, setSelectedDriverName] = useState();
  const [loadId, setLoadId] = useState();

  const loadDriverData = (queryValue) => {
    const queryUrl = `${URL}?Name=${queryValue}`;
    fetch(queryUrl)
      .then((response) => response.json())
      .then((data) => {
        setDrivers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Plugin>
      <Template name="popupEditing">
        <TemplateConnector>
          {(
            { rows, getRowId, editingRowIds, rowChanges },
            { stopEditRows }
          ) => {
            const handleDriverSelection = (driver) => {
              setSelectedDriverId(driver.id);
              setSelectedDriverName(driver.name);
            };

            const isNew = 0;
            let currentLoadRow;
            let [rowId] = editingRowIds;
            const targetRow = rows.filter((row) => getRowId(row) === rowId)[0];
            currentLoadRow = { ...targetRow, ...rowChanges[rowId] };
            setLoadId(currentLoadRow.id);

            const processQueryChange = ({ target: { value } }) => {
              loadDriverData(value);
            };
            const rowIds = isNew ? [0] : editingRowIds;

            const cancelChanges = () => {
              stopEditRows({ rowIds });
              resetState();
            };

            const resetState = () => {
              setSelectedDriverName(null);
              setSelectedDriverId(null);
              setDrivers({});
            };
            const handleAssignDriver = async () => {
              assignDriver(selectedDriverId, loadId);
              stopEditRows({ rowIds });
              resetState();
            };

            const open = editingRowIds.length > 0 || isNew;

            return (
              <Popup
                open={open}
                row={currentLoadRow}
                onQueryChange={processQueryChange}
                onAssignDriver={handleAssignDriver}
                onCancelChanges={cancelChanges}
                onItemClick={handleDriverSelection}
                selectedDriverName={selectedDriverName}
                drivers={drivers}
              />
            );
          }}
        </TemplateConnector>
      </Template>
      <Template name="root">
        <TemplatePlaceholder />
        <TemplatePlaceholder name="popupEditing" />
      </Template>
    </Plugin>
  );
};

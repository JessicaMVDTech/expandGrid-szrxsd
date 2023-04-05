import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Edit,
  Toolbar,
} from '@syncfusion/ej2-react-grids';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { createElement, getComponent } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { updateSampleSection } from './sample-base';
function RemoteDataBinding() {
  React.useEffect(() => {
    updateSampleSection();
  }, []);
  const data = new DataManager({
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    url: 'https://services.odata.org/v4/northwind/northwind.svc/Orders',
  });
  let gridInstance;

  const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const templateEditLookup = {
    create: () => {
      return createElement('input');
    },
    read: (args) => {
      debugger;
      const dropDownList = getComponent(args.id, 'dropdownlist');
      return dropDownList.itemData.EmployeeID;
    },
    write: async (args) => {
      debugger;
      const field = args.column.field;
      const indice = field.indexOf('.');
      const NameField = field.substring(indice + 1, field.length);
      const column = field.substring(0, indice);
      const value = args.rowData[column];

      const dropDownList = new DropDownList({
        dataSource: new DataManager({
          url: `https://services.odata.org/v4/northwind/northwind.svc/Employees?$select=LastName,EmployeeID`,
          adaptor: new ODataV4Adaptor(),
        }),
        fields: { text: NameField },
        value: value === null ? value : value.LastName,
      });
      dropDownList.appendTo(args.element);
    },
  };

  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    newRowPosition: 'Top',
  };

  const pageSettings = { pageCount: 5 };

  return (
    <div className="control-pane">
      <div className="control-section">
        <GridComponent
          dataSource={data}
          height={315}
          allowPaging={true}
          columnQueryMode={'ExcludeHidden'}
          toolbar={toolbarOptions}
          editSettings={editSettings}
          pageSettings={pageSettings}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="OrderID"
              headerText="Order ID"
              width="120"
              textAlign="Right"
              visible={true}
              isPrimaryKey={true}
            />
            <ColumnDirective
              field="ShipName"
              headerText="Ship Name"
              width="150"
            />
            <ColumnDirective
              field="Employee.LastName"
              headerText="Employee LastName"
              width="150"
              edit={templateEditLookup}
            />
            <ColumnDirective
              field="Employee.Employee1.LastName"
              headerText="ReportsTo LastName"
              width="150"
            />

            <ColumnDirective
              field="Employee.Employee1.FirstName"
              headerText="ReportsTo FirstName"
              width="150"
            />
          </ColumnsDirective>
          <Inject services={[Edit, Toolbar, Page]} />
        </GridComponent>
      </div>
      <div id="waitingpopup" className="waitingpopup">
        <span id="gif" className="image"></span>
      </div>
    </div>
  );
}
export default RemoteDataBinding;

const root = createRoot(document.getElementById('sample'));
root.render(<RemoteDataBinding />);

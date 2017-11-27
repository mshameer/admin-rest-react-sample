import React from 'react';
import { Datagrid, TextField, EditButton, SimpleForm, TextInput, Responsive, ReferenceField } from 'admin-on-rest';
import List from '../mui/list';
import Create from '../mui/detail/create';
import Edit from '../mui/detail/edit';
import SimpleList from '../mui/list/simpleList';
import Avatar from 'material-ui/Avatar';
import { getCurrentUser} from '../utils/permissions';
import Place from 'material-ui/svg-icons/maps/place';
import { orgLevelInput, getPermissionBasedFilters } from '../utils/common';


const currentUser = getCurrentUser();
const UnitField = ({ source, record = {} }) => <span>Unit: {record[source]}</span>;

export const PlaceList = (props) => (
  <List {...props} title="Places" filter={ getPermissionBasedFilters(currentUser) } >
    <Responsive
      small={
        <SimpleList leftAvatar={record => <Avatar icon={<Place />} />} >
          <TextField label="Place Name" source="name" type="primary" />
          <ReferenceField label="Unit" source="unitId" reference="units" type="secondary" linkType="none" >
            <UnitField source="name" />
          </ReferenceField>
        </SimpleList>
      }
      medium={
        <Datagrid>
          <TextField label="Name" source="name" />
          <ReferenceField label="District" source="districtId" reference="districts" >
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField label="Zone" source="zoneId" reference="zones" >
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField label="Unit" source="unitId" reference="units" >
            <TextField source="name" />
          </ReferenceField>
          <EditButton />
        </Datagrid>
      }
      />
  </List>
);

const PlaceTitle = ({ record }) => {
  return <span>Place {record ? `"${record.name}"` : ''}</span>;
  };

  const validatePlaceForm = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = ['Place Name is required'];
    }
    return errors
  };

const getPlaceForm = () => (
  <SimpleForm validate={validatePlaceForm} redirect="/places" >
    <TextInput label="Name" source="name" options={{ fullWidth: true }} />
    { orgLevelInput('districtId', 'districts', 'District', currentUser) }
    { orgLevelInput('zoneId', 'zones', 'Zone', currentUser, 'districtId') }
    { orgLevelInput('unitId', 'units', 'Unit', currentUser, 'zoneId') }
  </SimpleForm>
)

  export const PlaceEdit = (props) => (
    <Edit title={<PlaceTitle />} {...props}>
      { getPlaceForm() }
    </Edit>
  );

  export const PlaceCreate = (props) => (
    <Create {...props}>
      { getPlaceForm() }
    </Create>
  );

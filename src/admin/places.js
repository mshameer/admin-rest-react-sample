import React from 'react';
import { Datagrid, TextField, EditButton, SimpleForm, TextInput, Responsive, ReferenceField } from 'admin-on-rest';
import List from '../mui/list';
import Create from '../mui/detail/create';
import Edit from '../mui/detail/edit';
import SimpleList from '../mui/list/simpleList';
import Avatar from 'material-ui/Avatar';
import { getCurrentUser} from '../utils/permissions';
import Place from 'material-ui/svg-icons/maps/place';

const currentUser = getCurrentUser();
const UnitField = ({ source, record = {} }) => <span>Unit: {record[source]}</span>;

export const PlaceList = (props) => (
  <List {...props} title="Places"  filter={{ unitId: currentUser.unitId }}>
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
          <TextField label="Place Name" source="name" />
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

  export const PlaceEdit = (props) => (
    <Edit title={<PlaceTitle />} {...props}>
      <SimpleForm validate={validatePlaceForm} redirect="/places" >
        <TextInput label="Name" source="name" />
        <TextField source="unitId" style={{ display: 'none'}} defaultValue={currentUser.unitId} />
      </SimpleForm>
    </Edit>
  );

  export const PlaceCreate = (props) => (
    <Create {...props}>
      <SimpleForm validate={validatePlaceForm} redirect="/places" >
        <TextInput label="Name" source="name" />
        <TextField source="unitId" style={{ display: 'none'}} defaultValue={currentUser.unitId} />
      </SimpleForm>
    </Create>
  );

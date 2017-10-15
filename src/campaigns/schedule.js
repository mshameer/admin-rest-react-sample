import React from 'react';
import { Edit, Create, Datagrid, ReferenceField, TextField, Responsive, FormTab, CheckboxGroupInput, TabbedForm,
  EditButton, ReferenceInput, SelectInput } from 'admin-on-rest';
import SimpleList from '../mui/list/simpleList'
import List from '../mui/list';
import Avatar from 'material-ui/Avatar';
import Update from 'material-ui/svg-icons/action/update';

export const ScheduleList = (props) => (
  <List {...props}>
    <Responsive
      small={
        <SimpleList leftAvatar={record => <Avatar icon={<Update />} />} >
          <ReferenceField label="Campaign" source="campaignId" reference="campaigns" type="primary" linkType="none" >
            <TextField source="title" />
          </ReferenceField>
          <ReferenceField label="Team" source="teamId" reference="teams" type="secondary" linkType="none" >
            <TextField source="name" />
          </ReferenceField>
        </SimpleList>
      }
      medium={
        <Datagrid>
          <ReferenceField label="Campaign" source="campaignId" reference="campaigns" >
            <TextField source="title" />
          </ReferenceField>
          <ReferenceField label="Team" source="teamId" reference="teams" >
            <TextField source="name" />
          </ReferenceField>
          <EditButton />
        </Datagrid>
      }
      />
  </List>
);

  const validateScheduleForm = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = ['Schedule name is required'];
    }
    return errors
  };

  export const ScheduleEdit = (props) => (
    <Edit title="Edit Schedule" {...props}>
      <TabbedForm validate={validateScheduleForm} >
        <FormTab label="Schedule" >
          <ReferenceInput label="Campaign" source="campaignId" reference="campaigns" allowEmpty >
            <SelectInput optionText="title" />
          </ReferenceInput>
          <ReferenceInput label="Team" source="teamId" reference="teams" allowEmpty >
            <SelectInput optionText="name" />
          </ReferenceInput>
        </FormTab>
        <FormTab label="Guests">
          <ReferenceInput label="Guests to visit" source="guestIds" reference="guests" allowEmpty >
            <CheckboxGroupInput source="name"  optionText="name"  />
          </ReferenceInput>
        </FormTab>
      </TabbedForm>
    </Edit>
  );

  export const ScheduleCreate = (props) => (
    <Create {...props}>
      <TabbedForm validate={validateScheduleForm} >
        <FormTab label="Schedule" >
          <ReferenceInput label="Campaign" source="campaignId" reference="campaigns" allowEmpty >
            <SelectInput optionText="title" />
          </ReferenceInput>
          <ReferenceInput label="Team" source="teamId" reference="teams" allowEmpty >
            <SelectInput optionText="name" />
          </ReferenceInput>
        </FormTab>
        <FormTab label="Guests">
          <ReferenceInput label="Guests to visit" source="guestIds" reference="guests" allowEmpty >
            <CheckboxGroupInput source="name"  optionText="name"  />
          </ReferenceInput>
        </FormTab>
      </TabbedForm>
    </Create>
  );

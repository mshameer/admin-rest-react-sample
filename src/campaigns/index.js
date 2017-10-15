import React from 'react';
import { Edit, Create, Datagrid, TextField, Responsive, DateInput, DateField, TabbedForm,
  EditButton, SelectInput, TextInput, FormTab, CheckboxGroupInput  } from 'admin-on-rest';
import SimpleList from '../mui/list/simpleList'
import List from '../mui/list';
import Avatar from 'material-ui/Avatar';
import Weekend from 'material-ui/svg-icons/content/weekend';

const campaignStatus = [
  { id: 'notStarted', name: 'Not Started' },
  { id: 'inProgress', name: 'In Progress' },
  { id: 'completed', name: 'Completed' },
];

const actionChoices = [
  { id: '1', name: 'Peace Radio Installation' },
  { id: '2', name: 'Nerpadham Subscription' },
  { id: '3', name: 'Jeevitham Enthinu Vendi' },
  { id: '4', name: 'Kathorkkuka Srushttavinuvendi' },
  { id: '5', name: 'Quran Class Invited' },
]

// const formateCampaign = (record) => {
//   const index = campaignStatus.findIndex(obj => obj.id === record.status);
//   return index && campaignStatus[index].name;
// }

export const CampaignList = (props) => (
  <List {...props} title="Campaigns">
    <Responsive
      small={
        <SimpleList
          leftAvatar={record => <Avatar icon={<Weekend />} />}
        >
          <TextField source="title" type="primary" />
          <DateField source="cmpDate" type="secondary" />
          <TextField source="status" type="tertiary"  />
        </SimpleList>
      }
      medium={
        <Datagrid>
          <TextField label="Title" source="title" />
          <DateField label="Date" source="cmpDate" />
          <TextField label="Status" source="status" />
          <EditButton />
        </Datagrid>
      }
      />
  </List>
);

const CampaignTitle = ({ record }) => {
  return <span>Campaign {record ? `"${record.title}"` : ''}</span>;
  };

  const validateCampaignForm = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = ['Campaign title is required'];
    }

    return errors
  };

  export const CampaignEdit = (props) => (
    <Edit title={<CampaignTitle />} {...props}>
      <TabbedForm validate={validateCampaignForm} >
        <FormTab label="Campaign">
          <TextInput source="title" />
          <DateInput source="cmpDate" label="Date" />
          <SelectInput source="status" choices={campaignStatus} />
        </FormTab>
        <FormTab label="Actions">
          <CheckboxGroupInput source="actions" choices={actionChoices} optionText="name" optionValue="id" />
        </FormTab>
      </TabbedForm>
    </Edit>
  );

  export const CampaignCreate = (props) => (
    <Create {...props}>
      <TabbedForm validate={validateCampaignForm} >
        <FormTab label="Campaign">
          <TextInput source="title" />
          <DateInput source="cmpDate" label="Date" />
          <SelectInput source="status" choices={campaignStatus} />
        </FormTab>
        <FormTab label="Actions">
          <CheckboxGroupInput source="actions" choices={actionChoices} optionText="name" optionValue="id" />
        </FormTab>
      </TabbedForm>
    </Create>
  );

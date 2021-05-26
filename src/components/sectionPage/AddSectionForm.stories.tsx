import AddSectionForm from './AddSectionForm';

export default {
  title: 'SectionPage/AddSectionForm',
  component: AddSectionForm,
};

const Template = () => (
  <AddSectionForm
    onChange={() => {}}
    lines={[]}
    stations={[]}
    lineSection={{ id: 1, color: '', name: '', stations: [], sections: [] }}
  />
);
export const Default = Template.bind({});

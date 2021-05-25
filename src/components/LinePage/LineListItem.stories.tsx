import LineListItem from './LineListItem';

export default {
  title: 'LinePage/LineListItem',
  component: LineListItem,
};

const Template = () => <LineListItem name='1호선' id={1} color='blue' />;
export const Default = Template.bind({});

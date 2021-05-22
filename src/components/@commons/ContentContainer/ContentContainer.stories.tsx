import ContentContainer, { Props } from './ContentContainer';

export default {
  title: 'Commons/ContentContainer ',
  component: ContentContainer,
  argTypes: {},
};

const Template = (args: Props) => <ContentContainer {...args} />;
export const Default = Template.bind({});

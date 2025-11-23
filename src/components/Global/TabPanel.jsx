export default function TabPanel({ currentTab, index, content }) {
  return <div hidden={currentTab === index ? false : true}>{content}</div>;
}

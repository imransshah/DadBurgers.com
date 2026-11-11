import { useData } from "../App.jsx";
import { searchItems } from "../lib/data.js";
import ItemList from "../components/ItemList.jsx";
import { Empty, PageHeader } from "../components/ui.jsx";

export default function Search({ query }) {
  const data = useData();
  const q = query.q ?? "";
  const results = searchItems(data, q);
  return (
    <>
      <PageHeader eyebrow="Search" title={q ? `“${q}”` : "Search"}>
        {results.length} result{results.length === 1 ? "" : "s"} across orders and guidance. Searches labels, titles, summaries and
        topics.
      </PageHeader>
      {results.length ? <ItemList items={results} /> : <Empty>No matches. Try an EO number, a memo number, or a topic like "logging".</Empty>}
    </>
  );
}

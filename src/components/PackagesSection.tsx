import PackageGrid from "./PackageGrid";
import Finder from "./Finder";
import { GROUPS, PACKAGES } from "@/lib/data";

function ComparisonTable() {
  return (
    <div className="tbl-wrap">
      <h3>Compare every deliverable</h3>
      <div className="scroll" tabIndex={0} role="region" aria-label="Package comparison table">
        <table>
          <thead>
            <tr>
              <th scope="col"><span className="sr">Deliverable</span></th>
              {PACKAGES.map((p) => <th key={p.id} scope="col" className={p.highlight ? "hi" : ""}>{p.id}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr><td>From</td>{PACKAGES.map((p) => <td key={p.id} className={`meta ${p.highlight ? "hi" : ""}`}>{p.price}</td>)}</tr>
            <tr><td>Turnaround</td>{PACKAGES.map((p) => <td key={p.id} className={`meta ${p.highlight ? "hi" : ""}`}>{p.turn}</td>)}</tr>
            {GROUPS.map((g) => (
              <FragmentRows key={g.id} name={g.name} items={g.items.map((i) => i[0])} />
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">Sample prices in pounds sterling, excluding VAT. Replace with your rates.</p>
    </div>
  );
}

function FragmentRows({ name, items }: { name: string; items: string[] }) {
  return (
    <>
      <tr className="grp"><td colSpan={4}>{name}</td></tr>
      {items.map((n) => (
        <tr key={n}>
          <td>{n}</td>
          {PACKAGES.map((p) => {
            const y = p.set.includes(n);
            return (
              <td key={p.id} className={p.highlight ? "hi" : ""}>
                {y ? <span className="yes" aria-label="Included">✓</span> : <span className="no" aria-label="Not included">–</span>}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

export default function PackagesSection() {
  return (
    <section className="section packages" id="packages">
      <div className="wrap">
        <h2>Choose how far the launch goes.</h2>
        <p className="lede">Every package is priced per property. Multi-unit developments get a quoted rate.</p>
        <PackageGrid />
        <Finder />
        <ComparisonTable />
      </div>
    </section>
  );
}

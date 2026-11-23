import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ExplorerNav } from "@/components/ExplorerNav";
import { FilterableModels, resetOriginFilterForTests } from "@/components/OriginFilter";

const replace = vi.fn();
const push = vi.fn();
let currentQuery = "";
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace, push }),
  usePathname: () => "/explorer/search",
  useSearchParams: () => new URLSearchParams(currentQuery ? `q=${currentQuery}` : ""),
}));

describe("ExplorerNav (mobile disclosure)", () => {
  const cats = [
    { id: "a", name: "Cat A", href: "/explorer/a", tasks: [{ id: "t1", name: "Task one", href: "/explorer/a/t1" }] },
    { id: "b", name: "Cat B", href: "/explorer/b", tasks: [] },
  ];

  it("toggles the panel and marks the current task", async () => {
    render(<ExplorerNav categories={cats} currentCategoryId="a" currentTaskId="t1" locationLabel="A › Task one" />);
    const toggle = screen.getByRole("button", { name: /Category:/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    const panel = document.getElementById(toggle.getAttribute("aria-controls")!)!;
    expect(panel).toHaveAttribute("data-open", "false");
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveAttribute("data-open", "true");
    expect(screen.getByRole("link", { name: "Task one" })).toHaveAttribute("aria-current", "page");
    await userEvent.click(screen.getByRole("link", { name: "Task one" }));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});

describe("FilterableModels (Chinese model filter)", () => {
  beforeEach(() => resetOriginFilterForTests());

  it("filters rows by origin and updates the count", async () => {
    const { container } = render(
      <FilterableModels total={3} chinese={1}>
        <table>
          <tbody>
            <tr data-chinese="true"><td>Qwen</td></tr>
            <tr data-chinese="false"><td>Granite</td></tr>
            <tr data-chinese="false"><td>Mellum</td></tr>
          </tbody>
        </table>
      </FilterableModels>,
    );
    const wrapper = container.querySelector("[data-origin-filter]")!;
    expect(wrapper).toHaveAttribute("data-origin-filter", "all");
    expect(screen.getByText(/Showing/)).toHaveTextContent("Showing 3 of 3 models");

    await userEvent.click(screen.getByRole("radio", { name: "Exclude Chinese models" }));
    expect(wrapper).toHaveAttribute("data-origin-filter", "non-chinese");
    expect(screen.getByText(/Showing/)).toHaveTextContent("Showing 2 of 3 models");

    await userEvent.click(screen.getByRole("radio", { name: "Chinese models only" }));
    expect(screen.getByText(/Showing/)).toHaveTextContent("Showing 1 of 3 models");
  });

  it("shows an empty message when nothing matches", async () => {
    render(
      <FilterableModels total={1} chinese={0}>
        <p>table</p>
      </FilterableModels>,
    );
    await userEvent.click(screen.getByRole("radio", { name: "Chinese models only" }));
    expect(screen.getByText("No models match this filter.")).toBeInTheDocument();
  });
});

describe("SearchPanel", () => {
  beforeEach(() => {
    replace.mockClear();
    push.mockClear();
    currentQuery = "";
  });

  it("groups results by kind and links to the record", async () => {
    const { SearchPanel } = await import("@/components/SearchPanel");
    render(<SearchPanel />);
    await userEvent.type(screen.getByRole("searchbox"), "gso");
    expect(screen.getByRole("heading", { name: /Datasets/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GSO" })).toHaveAttribute("href", "/explorer/datasets/gso");
    expect(replace).toHaveBeenLastCalledWith("/explorer/search?q=gso", { scroll: false });
  });

  it("finds a checkpoint and shows its group", async () => {
    const { SearchPanel } = await import("@/components/SearchPanel");
    render(<SearchPanel />);
    await userEvent.type(screen.getByRole("searchbox"), "Flint");
    expect(screen.getByRole("heading", { name: /Models/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Recursive Flint BF16" })).toHaveAttribute(
      "href",
      "/explorer/models/recursive-flint-bf16",
    );
  });

  it("shows the empty state for no matches", async () => {
    const { SearchPanel } = await import("@/components/SearchPanel");
    render(<SearchPanel />);
    await userEvent.type(screen.getByRole("searchbox"), "zzqx");
    expect(screen.getByText(/No tasks, models or datasets match/)).toBeInTheDocument();
    expect(screen.getByText(/No matches/)).toBeInTheDocument();
  });

  it("reads the initial query from the URL", async () => {
    currentQuery = "CRUXEval";
    const { SearchPanel } = await import("@/components/SearchPanel");
    render(<SearchPanel />);
    expect(screen.getByRole("searchbox")).toHaveValue("CRUXEval");
    expect(screen.getByRole("link", { name: "CRUXEval" })).toBeInTheDocument();
  });
});

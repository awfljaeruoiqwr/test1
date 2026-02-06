type Props = {
  categories: string[];
  category: string;
  onCategoryChange: (value: string) => void;
};

export const FilterBar = ({ categories, category, onCategoryChange }: Props) => (
  <div className="filter-bar">
    <h2>추천 상품</h2>
    <label>
      <span className="visually-hidden">카테고리 필터</span>
      <select
        className="filter-select"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label="카테고리 선택"
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  </div>
);

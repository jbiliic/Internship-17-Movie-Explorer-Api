import style from './FilteringBtn.module.css'

interface FilteringBtnProps {
    onChange: (value: string | null) => void;
    options: string[];
}
export const FilteringBtn = (props: FilteringBtnProps) => {
    return (
        <>
            <select className={style.selectFilter} onChange={(e) => props.onChange(e.target.value || null)}>
                <option value="">All</option>
                {props.options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    )
}
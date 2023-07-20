import Link from "next/link";

const fetchMenus = async () => {
    const results = await fetch("https://jsonplaceholder.typicode.com/todos");
    const menus = await results.json()
    return menus
}

function NavigatorItem() {
    const menus = [
        { path: '/menus/board', label: 'table'},
        { path: '/menus/card', label: 'card'},
        { path: '/menus/list', label: 'list'},
    ]

    const menus1 = fetchMenus()

    return (
        <ul>
            {menus.map((menu: any) => (
                <li key={menu.path}>
                    <Link href={menu.path}>{menu.label}</Link>
                </li>
            ))}
        </ul>
    )
}

export default NavigatorItem
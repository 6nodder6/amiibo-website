import { useState } from "react"

import {
    NavLink,
    Outlet
} from 'react-router-dom'

export function Root(props) {
    const { children } = props


    return (
        <>
            <aside>

                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">
                                HOME
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/owned">
                                OWNED
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/collections">
                                COLLECTIONS
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile">
                                PROFILE
                            </NavLink>
                        </li>
                    </ul>

                </nav>

            </aside>

            <main>
                {children || <Outlet />}
            </main>
        </>
    )
}
import React from 'react'
import { Helmet } from 'react-helmet';
export default function Title({ title }) {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </div>
    )
}

// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { handleMenuCollapsed, handleMenuHidden } from '@store/layout'

const LayoutWrapper = props => {
    // ** Props
    const { layout, children, appLayout, wrapperClass, transition, routeMeta } = props

    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state)

    //** Vars
    const Tag = layout === 'HorizontalLayout' && !appLayout ? 'div' : Fragment

    // ** Clean Up Function
    const cleanUp = () => {
        if (routeMeta) {

            if (routeMeta.menuCollapsed) {
                dispatch(handleMenuCollapsed(!routeMeta.menuCollapsed))
            }
            if (routeMeta.menuHidden) {
                dispatch(handleMenuHidden(!routeMeta.menuHidden))
            }
        }
    }

    // ** ComponentDidMount
    useEffect(() => {
        if (routeMeta) {

            if (routeMeta.menuCollapsed) {
                dispatch(handleMenuCollapsed(routeMeta.menuCollapsed))
            }
            if (routeMeta.menuHidden) {
                dispatch(handleMenuHidden(routeMeta.menuHidden))
            }
        }
        return () => cleanUp()
    }, [])

    return (
        <div>
            <Tag>
               
                {children}
            </Tag>
        </div>

    )
}

export default LayoutWrapper

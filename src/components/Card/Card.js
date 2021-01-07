import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Badge from '@material-ui/core/Badge'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SettingsCard from '../SettingsCard'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontWeight: '700',
  },
  dragIcon: {
    color: '#ECECEC',
    margin: '0px 10px 0px 0px',
    cursor: props => (props.dragging ? 'grabbing' : 'grab'),
  },
  chevronIcon: {
    margin: '0px 12px',
    cursor: 'pointer',
  },
  pointerIcon: {
    cursor: 'pointer',
  },
  children: {
    overflow: 'auto',
    textAlign: 'start',
    padding: '4px 0px 0px 4px',
  },
  paddingRight: {
    padding: '0px 15px 0px 0px',
  },
}))

const Paper = styled.div`
  margin: 2.5px;
  padding: 16px;
  background-color: #ffffff;
  box-shadow: 0 14px 20px 2px rgba(0, 0, 0, 0.14),
    0 6px 26px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  position: relative;
  margin-bottom: 50px;
  transition: all 0.2s ease-in-out;
`

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`

const FlexSpacedDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const Navigation = ({ items, classes, itemIndex, onPrevItem, onNextItem }) => (
  <FlexSpacedDiv>
    <ChevronLeftIcon className={classes.chevronIcon} onClick={onPrevItem} />
    <FlexDiv>{`${itemIndex + 1} of ${items.length}`}</FlexDiv>
    <ChevronRightIcon className={classes.chevronIcon} onClick={onNextItem} />
  </FlexSpacedDiv>
)

const Card = ({
  alert,
  title,
  items,
  dragRef,
  onClose,
  headers,
  filters,
  fontSize,
  dragging,
  children,
  itemIndex,
  closeable,
  setFilters,
  setFontSize,
  markdownView,
  setItemIndex,
  onRemoveCard,
  setMarkdownView,
  classes: { root, dragIndicator, header, children: childrenClassName },
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const classes = useStyles({ dragging })

  const onAlertClick = () => {
    console.log('onAlertClick')
  }

  const onMenuClick = () => {
    setShowMenu(!showMenu)
  }

  const onPrevItem = () => {
    const newIndex = itemIndex - 1
    if (newIndex < 0) {
      setItemIndex(items.length - 1)
    } else {
      setItemIndex(newIndex)
    }
  }

  const onNextItem = () => {
    const newIndex = itemIndex + 1
    if (newIndex > items.length - 1) {
      setItemIndex(0)
    } else {
      setItemIndex(newIndex)
    }
  }

  return (
    <Paper ref={dragRef} className={root}>
      <FlexSpacedDiv className={header}>
        <FlexDiv>
          <DragIndicatorIcon
            className={`${classes.dragIcon} ${dragIndicator}`}
          />
          <div className={classes.title}>{title}</div>
        </FlexDiv>
        <FlexDiv>
          {items && items.length > 1 && (
            <Navigation
              items={items}
              classes={classes}
              itemIndex={itemIndex}
              onPrevItem={onPrevItem}
              onNextItem={onNextItem}
            />
          )}
        </FlexDiv>
        {closeable ? (
          <CloseIcon className={classes.pointerIcon} onClick={onClose} />
        ) : (
          <FlexDiv>
            {alert && (
              <div
                className={`${classes.pointerIcon} ${classes.paddingRight}`}
                onClick={onAlertClick}
              >
                <Badge color='secondary' variant='dot'>
                  <AnnouncementIcon />
                </Badge>
              </div>
            )}
            {showMenu && (
              <SettingsCard
                title={title}
                open={showMenu}
                headers={headers}
                filters={filters}
                fontSize={fontSize}
                onClose={onMenuClick}
                setFilters={setFilters}
                setFontSize={setFontSize}
                markdownView={markdownView}
                onShowMarkdown={setMarkdownView}
                onRemoveCard={onRemoveCard}
              />
            )}
            <MoreHorizIcon
              className={classes.pointerIcon}
              onClick={onMenuClick}
            />
          </FlexDiv>
        )}
      </FlexSpacedDiv>
      <div className={`${classes.children} ${childrenClassName}`}>
        {children}
      </div>
    </Paper>
  )
}

Card.defaultProps = {
  classes: {
    root: '',
    header: '',
    children: '',
    dragIndicator: '',
  },
  filters: [],
  headers: [],
  alert: false,
  fontSize: 100,
  dragging: false,
  closeable: false,
}

Card.propTypes = {
  /** Array of items (articles, tsv files) */
  items: PropTypes.array,
  /** Array of TSV header labels */
  headers: PropTypes.array.isRequired,
  /** Current item index */
  itemIndex: PropTypes.number,
  /** Root ref, used as reference for drag action */
  dragRef: PropTypes.node,
  /** Show alert icon */
  alert: PropTypes.bool,
  /** Show dragging icon when card is dragged */
  dragging: PropTypes.bool,
  /** Show close (x) icon instead of three dot menu icon */
  closeable: PropTypes.bool,
  /** Class names to modify the root, header and children */
  classes: PropTypes.object,
  /** The title of the card*/
  title: PropTypes.string.isRequired,
  /** Function fired when the close (x) icon is clicked */
  onClose: PropTypes.func,
  /** Content/jsx render in the body of the card */
  children: PropTypes.node.isRequired,
  /** Array of TSV header filters */
  filters: PropTypes.array.isRequired,
  /** Updates the filters list */
  setFilters: PropTypes.func,
  /** Text font size */
  fontSize: PropTypes.number,
  /** Updates the filters list */
  setFontSize: PropTypes.func,
  /** Event handler to Remove Card */
  onRemoveCard: PropTypes.func,
}

export default Card

# TsvList

TSV List view.

```jsx
import React, { useState } from 'react'
import Card from '../../components/Card'
import useContent from '../../hooks/useContent.js'
import useCardState from '../../hooks/useCardState.js'

const Component = () => {
  const viewMode = 'list'
  const [selectedQuote, setQuote] = useState({})
  const { markdown, items } = useContent({
    verse: 1,
    chapter: 1,
    projectId: 'tit',
    ref: 'master',
    languageId: 'en',
    resourceId: 'twl',
    owner: 'test_org',
    fetchMarkdown: false,
    server: 'https://git.door43.org',
    viewMode,
  })

  const {
    state: {
      item,
      headers,
      filters,
      fontSize,
      itemIndex,
      markdownView,
    },
    actions: {
      setFilters,
      setFontSize,
      setItemIndex,
      setMarkdownView,
    }
  } = useCardState({
    items,
  })
  const showSaveChangesPrompt = () => {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  return (
    <Card
      items={items}
      title={'Words'}
      headers={headers}
      filters={filters}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setFontSize={setFontSize}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
      showSaveChangesPrompt={showSaveChangesPrompt}
      disableFilters
      disableNavigation
      hideMarkdownToggle
    >
      <TsvList
        items={items}
        filters={filters}
        fontSize={fontSize}
        markdownView={markdownView}
        selectedQuote={selectedQuote}
        setQuote={setQuote}
        showSaveChangesPrompt={showSaveChangesPrompt}
      />
    </Card>
  )
}

<Component/>
```

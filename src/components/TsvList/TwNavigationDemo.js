import React, { useState } from 'react'
import Card from '../Card'
import CardContent from '../CardContent'
import useContent from '../../hooks/useContent.js'
import useCardState from '../../hooks/useCardState.js'

const Card1 = ({ selectedQuote, setQuote, showSaveChangesPrompt }) => {
  const viewMode = 'list'
  const {
    items,
    markdown,
    props: { languageId },
  } = useContent({
    verse: 2,
    chapter: 1,
    projectId: 'mat',
    ref: 'master',
    languageId: 'en',
    resourceId: 'twl',
    owner: 'test_org',
    fetchMarkdown: false,
    server: 'https://git.door43.org',
    viewMode,
  })

  const {
    state: { item, headers, filters, fontSize, itemIndex, markdownView },
    actions: { setFilters, setFontSize, setItemIndex, setMarkdownView },
  } = useCardState({
    items,
  })

  return (
    <Card
      items={items}
      title={'translationWords List'}
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
      <CardContent
        item={item}
        items={items}
        filters={filters}
        fontSize={fontSize}
        markdown={markdown}
        viewMode={'list'}
        setQuote={setQuote}
        languageId={languageId}
        markdownView={markdownView}
        selectedQuote={selectedQuote}
        showSaveChangesPrompt={showSaveChangesPrompt}
      />
    </Card>
  )
}

const Card2 = ({ selectedQuote, setQuote, showSaveChangesPrompt }) => {
  const {
    items,
    markdown,
    props: { languageId },
  } = useContent({
    verse: 2,
    chapter: 1,
    projectId: 'mat',
    ref: 'master',
    languageId: 'en',
    resourceId: 'twl',
    owner: 'test_org',
    server: 'https://git.door43.org',
  })

  const {
    state: { item, headers, filters, fontSize, itemIndex, markdownView },
    actions: { setFilters, setFontSize, setItemIndex, setMarkdownView },
  } = useCardState({
    items,
    setQuote,
    selectedQuote,
  })

  return (
    <Card
      items={items}
      title={'translationWords Article'}
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
      hideMarkdownToggle
    >
      <CardContent
        item={item}
        items={items}
        filters={filters}
        fontSize={fontSize}
        markdown={markdown}
        viewMode={'markdown'}
        setQuote={setQuote}
        languageId={languageId}
        markdownView={markdownView}
        selectedQuote={selectedQuote}
        showSaveChangesPrompt={showSaveChangesPrompt}
      />
    </Card>
  )
}

export default function TwNavigationDemo() {
  const [selectedQuote, setQuote] = useState(null)
  const showSaveChangesPrompt = () => {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  return (
    <div style={{ display: 'flex' }}>
      <Card1
        selectedQuote={selectedQuote}
        setQuote={setQuote}
        showSaveChangesPrompt={showSaveChangesPrompt}
      />
      <Card2
        selectedQuote={selectedQuote}
        setQuote={setQuote}
        showSaveChangesPrompt={showSaveChangesPrompt}
      />
    </div>
  )
}

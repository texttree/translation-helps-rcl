import { useState, useEffect, useContext, useCallback } from 'react'
import axios from 'axios'
import { AuthenticationContext } from 'gitea-react-toolkit'
import useEventListener from './useEventListener'

/**
 * Custom hook that listens for link click events and if the link is a translation helps resource then fetches it.
 * @param {object} {
 *  owner,
 *  server,
 *  branch,
 *  taArticle,
 *  languageId,
 * }
 * @returns {Array} [
 *  {
 *    title,
 *    content,
 *    loading,
 *  },
 *  clearContent
 * ]
 */
export default function useResourceClickListener({
  owner,
  server,
  branch,
  taArticle,
  languageId,
}) {
  const { state: authentication } = useContext(AuthenticationContext)
  const [link, setLink] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)

  const handler = useCallback(
    e => {
      e.preventDefault()

      if (e?.target?.href) {
        setLink(e.target.href || null)
      }
      return
    },
    [setLink]
  )

  useEventListener('click', handler)

  useEffect(() => {
    async function fetchContent() {
      if (link) {
        setTitle('')
        setLoading(true)

        try {
          const tw = ['/other/', '/kt/', '/names/']
          const slug = link.includes('http')
            ? new URL(link).pathname
            : link.replace('rc://*/', '').replace('rc://', '')
          const slugs = slug.split('/')
          let url = ''
          let titleUrl = ''
          let _languageId = ''
          let resourceId = ''
          let filePath = ''
          let title = ''
          let data = ''

          if (
            slugs.length === 5 &&
            slug.includes('/ta/man/') &&
            link.includes('rc:/')
          ) {
            // "en/ta/man/translate/translate-names"
            _languageId = slugs[0] || languageId
            resourceId = slugs[1] || 'ta'
            filePath = `${slugs[3]}/${slugs[4]}`
            url = `${server}/${owner}/${_languageId}_${resourceId}/raw/branch/${branch}/${filePath}/01.md`
            titleUrl = `${server}/${owner}/${_languageId}_${resourceId}/raw/branch/${branch}/${filePath}/title.md`
          } else if (slug.includes('01.md')) {
            _languageId = languageId
            resourceId = 'ta'
            filePath = `${taArticle.projectId}/${slugs[1]}`
            url = `${server}/${owner}/${_languageId}_${resourceId}/raw/branch/${branch}/${filePath}/01.md`
            titleUrl = `${server}/${owner}/${_languageId}_${resourceId}/raw/branch/${branch}/${filePath}/title.md`
          } else if (tw.find(slugItem => slug.includes(slugItem))) {
            _languageId = languageId
            resourceId = 'tw'
            filePath = slug
            url = `${server}/${owner}/${_languageId}_${resourceId}/raw/branch/${branch}/bible${filePath}`
            title = slugs[2].replace('.md', '')
            title = title.charAt(0).toUpperCase() + title.slice(1)
          }

          const _config = { ...authentication.config }

          if (url) {
            data = await axios.get(url, { ..._config }).then(res => res.data)
          }

          if (titleUrl) {
            title = await axios
              .get(titleUrl, { ..._config })
              .then(res => res.data)
          }

          setContent(data)
          setTitle(title)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          console.error(error)
        }
      }
    }
    fetchContent()
  }, [
    link,
    owner,
    server,
    branch,
    languageId,
    authentication?.config,
    taArticle?.projectId,
  ])

  function clearContent() {
    setLink(null)
    setTitle(null)
    setContent(null)
    setLoading(false)
  }

  return [
    {
      title,
      content,
      loading,
    },
    clearContent,
  ]
}
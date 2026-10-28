import { useCallback, useEffect, useState } from 'react';
import { Archive, CheckCircle2, ChevronLeft, ChevronRight, Clock3, MessageSquareText, RefreshCw, Search, Send, UserRound } from 'lucide-react';
import {
  fetchInquiries,
  fetchInquiryDetails,
  replyToInquiry,
  setInquiryClaim,
  updateInquiryStatus,
} from '../../services/api.js';

const SERVICES = [
  'Web Development', 'Mobile Development', 'AI & Machine Learning', 'UI/UX Design',
  'Software Development', 'Digital Solutions', 'Not sure yet / General inquiry',
];

function formatDate(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function StatusBadge({ status }) {
  return <span className={`admin-status admin-status-${status || 'new'}`}>{(status || 'new').replace('_', ' ')}</span>;
}

function Empty({ children }) {
  return <div className="admin-empty"><div><MessageSquareText size={24} aria-hidden="true" /><p>{children}</p></div></div>;
}

function ReplyHistory({ replies = [] }) {
  if (!replies.length) return null;
  return (
    <section className="admin-reply-history" aria-label="Reply history">
      <h3>Reply history</h3>
      {replies.map((reply) => (
        <article className="admin-reply-card" key={reply.id}>
          <header><strong>{reply.senderName || 'TBD Labs staff'}</strong><time dateTime={reply.sentAt}>{formatDate(reply.sentAt)}</time></header>
          <p>{reply.messageBody}</p>
        </article>
      ))}
    </section>
  );
}

export default function InquiryWorkspace({ user, canHandleInquiries = false }) {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [status, setStatus] = useState('all');
  const [service, setService] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailFailedId, setDetailFailedId] = useState(null);
  const [working, setWorking] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(null);
  const [subject, setSubject] = useState('TBD Labs — response to your inquiry');
  const [messageBody, setMessageBody] = useState('');

  const loadList = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await fetchInquiries({ status, service, search, page, limit: 20 });
      if (!result.ok) {
        setError(result.error?.message || 'Could not load inquiries.');
        setItems([]);
        return;
      }
      const nextItems = result.data || [];
      setItems(nextItems);
      setPagination(result.pagination || { page, limit: 20, total: nextItems.length, totalPages: 1 });
      setSelectedId((current) => nextItems.some((item) => item.id === current) ? current : (nextItems[0]?.id || null));
    } catch {
      setError('Could not connect to the inquiry service.');
    } finally {
      setLoading(false);
    }
  }, [status, service, search, page]);

  useEffect(() => {
    const timer = window.setTimeout(loadList, 180);
    return () => window.clearTimeout(timer);
  }, [loadList, refreshKey]);

  useEffect(() => {
    let ignore = false;
    if (!selectedId) return undefined;
    fetchInquiryDetails(selectedId).then((result) => {
      if (ignore) return;
      if (result.ok) {
        setSelectedRecord(result.data.inquiry);
        setDetailFailedId(null);
      } else {
        setSelectedRecord(null);
        setDetailFailedId(selectedId);
      }
    }).catch(() => {
      if (!ignore) {
        setSelectedRecord(null);
        setDetailFailedId(selectedId);
      }
    });
    return () => { ignore = true; };
  }, [selectedId, refreshKey]);

  const selected = selectedRecord?.id === selectedId ? selectedRecord : null;
  const detailLoading = Boolean(selectedId && !selected && detailFailedId !== selectedId);

  const refresh = () => setRefreshKey((value) => value + 1);
  const sendClaim = async () => {
    if (!selected) return;
    setWorking(true);
    setNotice(null);
    const claimed = selected.claimedByUserId !== user.id;
    const result = await setInquiryClaim(selected.id, claimed);
    setWorking(false);
    if (result.ok) {
      setSelectedRecord(result.data.inquiry);
      setNotice({ type: 'success', message: claimed ? 'Inquiry claimed. You can now draft a reply.' : 'Claim released to the team.' });
      refresh();
    } else {
      setNotice({ type: 'error', message: result.error?.message || 'Could not update the claim.' });
      refresh();
    }
  };

  const sendReply = async (event) => {
    event.preventDefault();
    if (!selected || !messageBody.trim()) return;
    setWorking(true);
    setNotice(null);
    const result = await replyToInquiry(selected.id, { subject, messageBody });
    setWorking(false);
    if (result.ok) {
      setNotice({ type: 'success', message: 'Reply sent and saved to the inquiry history.' });
      setMessageBody('');
      refresh();
    } else if (result.status === 409) {
      setNotice({ type: 'error', message: 'This inquiry changed while you were working. The latest status and reply history are loaded below.' });
      refresh();
    } else {
      setNotice({ type: 'error', message: result.error?.message || 'The reply could not be sent.' });
    }
  };

  const changeStatus = async () => {
    if (!selected) return;
    const nextStatus = selected.status === 'archived' ? 'new' : 'archived';
    setWorking(true);
    const result = await updateInquiryStatus(selected.id, nextStatus);
    setWorking(false);
    if (result.ok) {
      setNotice({ type: 'success', message: nextStatus === 'archived' ? 'Inquiry archived.' : 'Inquiry returned to the inbox.' });
      refresh();
    } else {
      setNotice({ type: 'error', message: result.error?.message || 'Could not update the inquiry status.' });
    }
  };

  const claimedByOther = selected?.claimedByUserId && selected.claimedByUserId !== user.id;
  const claimedByMe = selected?.claimedByUserId === user.id;
  const canDraft = canHandleInquiries && selected?.status !== 'replied' && selected?.status !== 'archived' && claimedByMe;

  return (
    <div>
      <div className="admin-page-heading">
        <h2>{canHandleInquiries ? 'Inquiry inbox' : 'Inquiry overview'}</h2>
        <p>{canHandleInquiries ? 'Claim an inquiry to coordinate drafting, then send and track the official reply.' : 'Review incoming project inquiries. Replying and status changes are handled by staff.'}</p>
      </div>

      <div className="admin-inbox-layout">
        <section className="admin-panel admin-inquiry-list" aria-label="Inquiry list">
          <div className="admin-toolbar">
            <label className="admin-search">
              <Search size={16} aria-hidden="true" />
              <span className="visually-hidden">Search inquiries</span>
              <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search name, email, or brief" />
            </label>
            <label className="admin-filter">
              <span className="visually-hidden">Filter by status</span>
              <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}>
                <option value="all">All statuses</option>
                <option value="new">New</option>
                <option value="in_progress">In progress</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label className="admin-filter">
              <span className="visually-hidden">Filter by service</span>
              <select value={service} onChange={(event) => { setService(event.target.value); setPage(1); }}>
                <option value="all">All services</option>
                {SERVICES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>

          {loading ? <div className="admin-loading">Loading inquiries…</div> : error ? <div className="admin-empty" role="alert">{error}</div> : items.length === 0 ? <Empty>No inquiries match these filters.</Empty> : (
            <div className="admin-inquiry-items">
              {items.map((item) => (
                <button type="button" className="admin-inquiry-item" aria-pressed={selectedId === item.id} key={item.id} onClick={() => setSelectedId(item.id)}>
                  <span className="admin-inquiry-item-top"><StatusBadge status={item.status} /><time>{formatDate(item.createdAt)}</time></span>
                  <strong>{item.name}</strong>
                  <p>{item.service} · {item.email}</p>
                </button>
              ))}
            </div>
          )}
          <div className="admin-pagination">
            <span>{pagination.total ? `${pagination.total} inquiries` : 'No results'} · Page {page} of {Math.max(1, pagination.totalPages || 1)}</span>
            <div>
              <button type="button" className="admin-button admin-icon-button" aria-label="Previous page" disabled={page <= 1 || loading} onClick={() => setPage((value) => Math.max(1, value - 1))}><ChevronLeft size={16} /></button>
              <button type="button" className="admin-button admin-icon-button" aria-label="Next page" disabled={page >= (pagination.totalPages || 1) || loading} onClick={() => setPage((value) => value + 1)}><ChevronRight size={16} /></button>
            </div>
          </div>
        </section>

        <section className="admin-panel admin-inquiry-detail" aria-label="Selected inquiry">
          {detailLoading ? <div className="admin-loading">Loading inquiry details…</div> : !selected ? <Empty>Select an inquiry to view its details.</Empty> : (
            <>
              <div className="admin-panel-heading">
                <span><StatusBadge status={selected.status} /></span>
                <div className="admin-detail-actions">
                  {canHandleInquiries && selected.status !== 'replied' && selected.status !== 'archived' && (
                    <button type="button" className="admin-button" disabled={working || (claimedByOther && !claimedByMe)} onClick={sendClaim}>
                      <UserRound size={14} /> {claimedByMe ? 'Release claim' : claimedByOther ? `Claimed by ${selected.claimedBy?.name || 'staff'}` : 'Claim inquiry'}
                    </button>
                  )}
                  {canHandleInquiries && selected.status !== 'replied' && (
                    <button type="button" className="admin-button admin-button-quiet" disabled={working} onClick={changeStatus}>
                      <Archive size={14} /> {selected.status === 'archived' ? 'Reopen' : 'Archive'}
                    </button>
                  )}
                  <button type="button" className="admin-button admin-icon-button" aria-label="Refresh inquiry" onClick={refresh}><RefreshCw size={14} /></button>
                </div>
              </div>
              <div className="admin-detail-content">
                <div className="admin-detail-title">
                  <div><h2>{selected.name}</h2><p>{selected.email}</p></div>
                </div>
                <dl className="admin-inquiry-meta">
                  <div><dt>Service</dt><dd>{selected.service}</dd></div>
                  <div><dt>Submitted</dt><dd>{formatDate(selected.createdAt)}</dd></div>
                  <div><dt>Phone</dt><dd>{selected.phone || 'Not provided'}</dd></div>
                  <div><dt>Organization</dt><dd>{selected.organization || 'Not provided'}</dd></div>
                  <div><dt>Budget range</dt><dd>{selected.budget || 'Not provided'}</dd></div>
                  <div><dt>Claimed by</dt><dd>{selected.claimedBy?.name || 'Unclaimed'}</dd></div>
                </dl>
                <h3 style={{ margin: '0 0 0.55rem', fontSize: '0.88rem' }}>Project brief</h3>
                <p className="admin-message">{selected.message}</p>

                {notice && <div className={`admin-inline-notice ${notice.type === 'error' ? 'admin-notice-error' : 'admin-notice-success'}`} role={notice.type === 'error' ? 'alert' : 'status'}>
                  {notice.type === 'error' ? <Clock3 size={15} /> : <CheckCircle2 size={15} />}{notice.message}
                </div>}

                <ReplyHistory replies={selected.replies} />

                {canHandleInquiries && selected.status !== 'replied' && selected.status !== 'archived' && !canDraft && !claimedByOther && (
                  <div className="admin-inline-notice" style={{ marginTop: '1.1rem' }}><UserRound size={15} />Claim this inquiry before drafting a response.</div>
                )}
                {canHandleInquiries && claimedByOther && selected.status !== 'replied' && selected.status !== 'archived' && (
                  <div className="admin-inline-notice" style={{ marginTop: '1.1rem' }}><Clock3 size={15} />This inquiry is being handled by {selected.claimedBy?.name || 'another staff member'}.</div>
                )}
                {canDraft && (
                  <form className="admin-reply-form" onSubmit={sendReply}>
                    <h3 style={{ margin: 0, fontSize: '0.95rem' }}>Reply to client</h3>
                    <div className="admin-field"><label htmlFor="reply-subject">Email subject</label><input id="reply-subject" value={subject} maxLength={200} onChange={(event) => setSubject(event.target.value)} /></div>
                    <div className="admin-field"><label htmlFor="reply-message">Message</label><textarea id="reply-message" required minLength={2} maxLength={10000} value={messageBody} onChange={(event) => setMessageBody(event.target.value)} placeholder={`Write a clear reply to ${selected.name}…`} /></div>
                    <div><button type="submit" className="admin-button admin-button-primary" disabled={working || !messageBody.trim()}><Send size={14} />{working ? 'Sending…' : 'Send reply'}</button></div>
                  </form>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

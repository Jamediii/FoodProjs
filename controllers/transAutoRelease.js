function transAutoRelease(conn) {
    if (conn.commit == Connection.prototype.commit)
        conn.commit = after(conn.commit, release);
    if (conn.rollback == Connection.prototype.rollback)
        conn.rollback = after(conn.rollback, release);

    function release() {
        if (conn) {
            conn.release();
        }
    }
}

module.exports = transAutoRelease;
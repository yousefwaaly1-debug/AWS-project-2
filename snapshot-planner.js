function solve(snapshots, nowStr, policy) {
    const now = new Date(nowStr);
    
    const primary = policy.primaryRegion;
    const dr = policy.drRegion;
    const retention = policy.retentionDays;
    const drRetention = policy.drRetentionDays;
    
    const result = {
        copy: [],
        delete: [],
        retain: [],
        skip: []
    };
    
    for (const snap of snapshots) {
        const sid = snap.snapshotId;
        const state = snap.state;
        const region = snap.region;
        const copied = snap.copiedToDr;
        const createdAt = new Date(snap.createdAt);
        
        if (state !== "completed") {
            result.skip.push(sid);
            continue;
        }
        
        if (region !== primary && region !== dr) {
            result.skip.push(sid);
            continue;
        }
        
        const ageDays = (now - createdAt) / (1000 * 60 * 60 * 24);
        
        if (region === primary) {
            if (!copied) {
                result.copy.push(sid);
            } else if (ageDays >= retention) {
                result.delete.push(sid);
            } else {
                result.retain.push(sid);
            }
        } else if (region === dr) {
            if (ageDays >= drRetention) {
                result.delete.push(sid);
            } else {
                result.retain.push(sid);
            }
        }
    }
    
    for (const key in result) {
        result[key].sort();
    }
    
    return result;
}

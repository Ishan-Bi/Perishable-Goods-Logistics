def sort_by_priority(pickups):
    """
    Greedy: earliest expiry first
    """
    return sorted(pickups, key=lambda p: p.pickup_time)

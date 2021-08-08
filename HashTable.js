function hashStringtoInt(string, table) {
    let hash = 17

    for (let i = 0; i < string.length; i++) {
        hash = (13 * hash * string.charCodeAt(i)) % table.length
    }

    return hash
}

class HashTable {
    table = new Array(229)
    numberItems = 0

    resize() {
        const newTable = new Array(this.table.length * 2) 
        this.table.forEach(item => {
            if (item) {
                item.forEach(([key, value]) => {
                    const index = hashStringtoInt(key, newTable.length)

                    if (newTable[index]) {
                        newTable[index].push([key, value])
                    } else {
                        newTable[index] = [[key, value]]
                    }
                })
            }
        })
        this.table = newTable
    }

    set(key, value) {
        this.numberItems++
        const index = hashStringtoInt(key, this.table)

        const loadFactor = this.numberItems / this.table.length
        if (loadFactor > .8) {
            this.resize()
        }

        if (this.table[index]) {
            this.table[index].push([key, value])
        } else {
            this.table[index] = [[key, value]]
        }
        
    }

    get(key) {
        const index = hashStringtoInt(key, this.table)
        return !this.table[index] ? null : this.table[index].find(x => x[0] === key)[1]
    }
}

module.exports = {
    isValidId(req, res, next) {
        if(!isNaN(req.params.id)) return next();
        next(new Error('Invalid ID'));
    },
    validClass(classe){
        const hasName = typeof classe.name == 'string' && classe.name.trim() != '';
        const hasPowerType = typeof classe.powerType == 'string' && classe.powerType.trim() != '';
        const hasMedia = typeof classe.media == 'string' && classe.media.trim() != '';
        return hasName && hasPowerType && hasMedia;
    },
    validItemClass(itemClass){
        const hasName = typeof itemClass.name == 'string' && itemClass.name.trim() != '';
        return hasName;
    },
    validItem(item){
        const hasName = typeof item.name == 'string' && item.name.trim() != '';
        const hasQuality = typeof item.quality == 'string' && item.quality.trim() != '';
        const hasLevel = !isNaN(item.level);
        const hasRequiredLevel = !isNaN(item.requiredLevel);
        const hasPurchasePrice = !isNaN(item.purchasePrice);
        const hasSellPrice = !isNaN(item.sellPrice);
        const hasIsEquippable = !isNaN(item.isEquippable);
        const hasIsStackable = !isNaN(item.isStackable);
        const hasMedia = typeof item.media == 'string' && item.media.trim() != '';
        const hasItemClass = !isNaN(item.itemClass);
        return hasName && hasQuality && hasLevel && hasRequiredLevel && hasPurchasePrice 
        && hasSellPrice && hasIsEquippable && hasIsStackable && hasMedia && hasItemClass;
    },
    validMount(mount){
        const hasName = typeof mount.name == 'string' && mount.name.trim() != '';
        const hasDescription = typeof mount.description == 'string' && mount.description.trim() != '';
        const hasSource = typeof mount.source == 'string' && mount.source.trim() != '';
        const hasFaction = typeof mount.faction == 'string' && mount.faction.trim() != '';
        const hasMedia = typeof mount.media == 'string' && mount.media.trim() != '';
        const hasPlayer = !isNaN(mount.player);
        return hasName && hasDescription && hasSource && hasFaction && hasMedia && hasPlayer;
    },
    validPlayer(player){
        const hasUsername = typeof player.username == 'string' && player.username.trim() != '';
        const hasIsConnected = !isNaN(player.isConnected);
        const hasLevel = !isNaN(player.level);
        const hasIcon = typeof player.icon == 'string' && player.icon.trim() != '';
        const hasClass = !isNaN(player.class);
        const hasRace = !isNaN(player.race);
        const hasProfession = !isNaN(player.profession);
        return hasUsername && hasIsConnected && hasLevel && hasIcon && hasClass && hasRace && hasProfession;
    },
    validPlayerItem(playerItem){
        const hasItem = !isNaN(playerItem.item);
        const hasPlayer = !isNaN(playerItem.player);
        const hasNumberInInventory = !isNaN(playerItem.numberInInventory);
        return hasItem && hasPlayer && hasNumberInInventory;
    },
    validProfession(profession){
        const hasName = typeof profession.name == 'string' && profession.name.trim() != '';
        const hasDescription = typeof profession.description == 'string' && profession.description.trim() != '';
        const hasType = typeof profession.type == 'string' && profession.type.trim() != '';
        const hasMedia = typeof profession.media == 'string' && profession.media.trim() != '';
        return hasName && hasDescription && hasType && hasMedia;
    },
    validRace(race){
        const hasName = typeof race.name == 'string' && race.name.trim() != '';
        const hasFaction = typeof race.faction == 'string' && race.faction.trim() != '';
        return hasName && hasFaction;
    }
}
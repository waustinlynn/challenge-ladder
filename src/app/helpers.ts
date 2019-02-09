import { PlayerService } from './player.service';
import { LadderService } from './ladder.service';
import { Observable, combineLatest, Observer } from 'rxjs';

export function moveItemInArray(arr: any[], previousIndex: number, newIndex: number): any[] {
    if (previousIndex == newIndex) return arr;

    let moveableRecord = { ...arr[previousIndex] };

    let top = arr.slice(0, previousIndex);
    let bottom = arr.slice(previousIndex + 1, arr.length);

    if (previousIndex > newIndex) {
        let subTop = top.slice(0, newIndex);
        let subBottom = top.slice(newIndex, top.length);
        subTop.push(moveableRecord);
        return subTop.concat(subBottom).concat(bottom);
    }

    if (previousIndex < newIndex) {
        //account for index offset after initial array split
        newIndex = newIndex - previousIndex;
        let subTop = bottom.slice(0, newIndex);
        let subBottom = bottom.slice(newIndex, bottom.length);
        subTop.push(moveableRecord);
        return top.concat(subTop).concat(subBottom);
    }
}

export function combineRankingsWithPlayers(rankingsArr: any[], playersArr: any[]): any[] {
    let playerMap = new Map<string, any>();
    playersArr.forEach(el => playerMap.set(el.id, el));

    function filter(el) {
        let found = playerMap.has(el.id);
        return found;
    }

    let returnArr = rankingsArr.filter(filter).map((el, idx) => {
        let player = playerMap.get(el.id);
        let pl = { ...player, position: idx + 1 };
        playerMap.delete(el.id);
        return pl;
    });
    returnArr = returnArr.concat(Array.from(playerMap.values()));
    return returnArr;
}

export function getRankedUserList(playerService: PlayerService, ladderService: LadderService): Observable<any[]> {
    return Observable.create((observer: Observer<any[]>) => {
        combineLatest(
            ladderService.getRankings(),
            playerService.getPlayers()
        ).subscribe(([rankings, players]) => {
            let displayRankings = combineRankingsWithPlayers(rankings as any[], players as any[]);
            observer.next(displayRankings);
            observer.complete();
        });
    })
}
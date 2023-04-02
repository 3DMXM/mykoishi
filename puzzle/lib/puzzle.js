"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Klotsk = void 0;
const log = console.log;
class Klotsk {
    constructor(mode) {
        this.cmd_strs = '';
        this.theme = [];
        this.drctn_dist = { 'U': [-1, 0], 'D': [1, 0], 'L': [0, -1], 'R': [0, 1] };
        this.drctn_list = ['U', 'D', 'L', 'R'];
        this.mode = mode;
        this.klotsk = [];
        this.num = 1;
        this.crtpuzzle = [];
        for (let i = 0; i < this.mode; i++) { // 生成数组
            var temp = [];
            for (let j = 0; j < this.mode; j++) {
                temp.push(this.num);
                this.num++;
            }
            this.crtpuzzle.push([].concat(temp));
            this.klotsk.push([].concat(temp));
        }
        this.crtpuzzle[this.mode - 1][this.mode - 1] = 0;
        this.klotsk[this.mode - 1][this.mode - 1] = 0;
        this.start_time = new Date().getTime(); //计时开始
        this.end_time = 0;
        this.shfl();
    }
    find_0() {
        for (let i = 0; i < this.mode; i++) { // 找出空的位置
            for (let j = 0; j < this.mode; j++) {
                if (this.klotsk[i][j] == 0) {
                    return [i, j];
                }
            }
        }
    }
    move(derect) {
        const [r, c] = this.find_0();
        if (r == 0 && derect == 'U') { // 判断是否可以移动
            return '';
        }
        else if (r == this.mode - 1 && derect == 'D') {
            return '';
        }
        else if (c == 0 && derect == 'L') {
            return '';
        }
        else if (c == this.mode - 1 && derect == 'R') {
            return '';
        }
        const [rr, cc] = this.drctn_dist[derect];
        const num1 = this.klotsk[rr + r][cc + c];
        this.klotsk[r][c] = num1;
        this.klotsk[rr + r][cc + c] = 0;
        return derect;
    }
    check() {
        for (let i = 0; i < this.mode; i++) { // 生成数组
            for (let j = 0; j < this.mode; j++) {
                if (this.klotsk[i][j] != this.crtpuzzle[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
    move_sqnc(sqnc) {
        this.cmd_strs = '';
        const sqnc_arr = sqnc.split('');
        for (var i in sqnc_arr) {
            var com_str = this.move(sqnc_arr[i]);
            this.cmd_strs += com_str;
            if (this.check()) {
                const dt = this.duration();
                log(`已还原,用时${dt}`);
                this.logf();
                return true;
            }
        }
        return false;
    }
    shfl() {
        for (let i = 0; i < 1000; i++) { // 打乱puzzle
            const rd = (Math.random() * 3).toFixed(0);
            this.move(this.drctn_list[rd]);
        }
    }
    logf() {
        for (var i in this.klotsk) {
            log(this.klotsk[i]);
        }
    }
    duration() {
        const time = new Date().getTime();
        const dt = time - this.start_time;
        return this.strftime(dt);
    }
    strftime(num_time) {
        const h = Math.floor(num_time / 3600);
        const m = Math.floor((num_time % 3600) / 60);
        const s = Math.floor((num_time % 60));
        const strftime = `${h}:${m}:${s}`;
        return strftime;
    }
}
exports.Klotsk = Klotsk;
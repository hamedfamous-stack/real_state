
import tkinter as tk
from tkinter import messagebox

PLAYER = 'O'
BOT = 'X'
WINNING_LINES = [
    (1, 2, 3), (4, 5, 6), (7, 8, 9),
    (1, 4, 7), (2, 5, 8), (3, 6, 9),
    (1, 5, 9), (3, 5, 7),
]


def check_winner(board, mark):
    for a, b, c in WINNING_LINES:
        if board[a] == board[b] == board[c] == mark:
            return True
    return False


def is_draw(board):
    return all(cell != ' ' for cell in board.values())


def minimax(board, is_maximizing, player, bot):
    if check_winner(board, bot):
        return 1
    if check_winner(board, player):
        return -1
    if is_draw(board):
        return 0

    if is_maximizing:
        best_score = -10
        for key in range(1, 10):
            if board[key] == ' ':
                board[key] = bot
                score = minimax(board, False, player, bot)
                board[key] = ' '
                best_score = max(best_score, score)
        return best_score

    best_score = 10
    for key in range(1, 10):
        if board[key] == ' ':
            board[key] = player
            score = minimax(board, True, player, bot)
            board[key] = ' '
            best_score = min(best_score, score)
    return best_score


def get_best_move(board, player, bot):
    best_score = -100
    best_move = 1

    for key in range(1, 10):
        if board[key] == ' ':
            board[key] = bot
            score = minimax(board, False, player, bot)
            board[key] = ' '
            if score > best_score:
                best_score = score
                best_move = key

    return best_move


class TicTacToeGUI:
    def __init__(self, root):
        self.root = root
        self.root.title('Tic-Tac-Toe')
        self.root.geometry('520x620')
        self.root.configure(bg='#0f172a')
        self.root.resizable(False, False)

        self.board = {i: ' ' for i in range(1, 10)}
        self.game_over = False

        title = tk.Label(
            root,
            text='Tic Tac Toe',
            fg='#f8fafc',
            bg='#0f172a',
            font=('Segoe UI', 28, 'bold'),
            pady=18,
        )
        title.pack()

        self.status = tk.Label(
            root,
            text="Your turn",
            fg='#facc15',
            bg='#111827',
            font=('Segoe UI', 16, 'bold'),
            pady=8,
        )
        self.status.pack(fill='x')

        frame = tk.Frame(root, bg='#111827', padx=18, pady=18)
        frame.pack()

        self.buttons = {}
        for i in range(1, 10):
            btn = tk.Button(
                frame,
                text=' ',
                width=6,
                height=3,
                font=('Segoe UI', 28, 'bold'),
                bg='#1e293b',
                fg='#e2e8f0',
                activebackground='#334155',
                bd=0,
                relief='flat',
                cursor='hand2',
                command=lambda pos=i: self.on_click(pos),
            )
            btn.grid(row=(i - 1) // 3, column=(i - 1) % 3, padx=8, pady=8, sticky='nsew')
            self.buttons[i] = btn

        for col in range(3):
            frame.columnconfigure(col, weight=1)
        for row in range(3):
            frame.rowconfigure(row, weight=1)

        bottom = tk.Frame(root, bg='#0f172a', pady=12)
        bottom.pack()

        reset_btn = tk.Button(
            bottom,
            text='Reset Game',
            width=18,
            height=2,
            font=('Segoe UI', 12, 'bold'),
            bg='#22c55e',
            fg='white',
            bd=0,
            cursor='hand2',
            command=self.reset_game,
        )
        reset_btn.pack()

        self.reset_game()

    def set_status(self, text, color='#facc15'):
        self.status.config(text=text, fg=color)

    def refresh_board(self):
        for index, btn in self.buttons.items():
            btn.config(text=self.board[index])
            if self.board[index] == 'X':
                btn.config(fg='#f87171')
            elif self.board[index] == 'O':
                btn.config(fg='#60a5fa')
            else:
                btn.config(fg='#e2e8f0')

    def finish_game(self, winner):
        self.game_over = True
        if winner == 'D':
            self.set_status('Draw!', '#a78bfa')
            messagebox.showinfo('Result', 'The game ended in a draw!')
        else:
            self.set_status(f'{winner} won!', '#34d399')
            messagebox.showinfo('Result', f'{winner} wins!')

    def check_game_state(self):
        if check_winner(self.board, PLAYER):
            self.finish_game(PLAYER)
            return True
        if check_winner(self.board, BOT):
            self.finish_game(BOT)
            return True
        if is_draw(self.board):
            self.finish_game('D')
            return True
        return False

    def bot_move(self):
        if self.game_over:
            return

        move = get_best_move(self.board, PLAYER, BOT)
        self.board[move] = BOT
        self.refresh_board()

        if self.check_game_state():
            return

        self.set_status("Your turn", '#facc15')

    def on_click(self, position):
        if self.game_over or self.board[position] != ' ':
            return

        self.board[position] = PLAYER
        self.refresh_board()

        if self.check_game_state():
            return

        self.set_status("Bot is thinking...", '#93c5fd')
        self.root.after(350, self.bot_move)

    def reset_game(self):
        self.board = {i: ' ' for i in range(1, 10)}
        self.game_over = False
        self.refresh_board()
        self.set_status("Your turn", '#facc15')


if __name__ == '__main__':
    root = tk.Tk()
    TicTacToeGUI(root)
    root.mainloop()

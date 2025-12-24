import toga
from toga.style import Pack
from toga.style.pack import COLUMN, ROW

class DonyEvent(toga.App):
    def startup(self):
        main_box = toga.Box(style=Pack(direction=COLUMN))
        label = toga.Label(
            'JDP System v24.0 - Dony Produções',
            style=Pack(padding=(0, 5))
        )
        main_box.add(label)
        self.main_window = toga.MainWindow(title=self.formal_name)
        self.main_window.content = main_box
        self.main_window.show()

def main():
    return DonyEvent()

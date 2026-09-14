#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::Manager;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum BreakWindowAction {
    Show,
    Unminimize,
    Fullscreen,
    AlwaysOnTop,
    Focus,
}

fn enter_break_actions() -> [BreakWindowAction; 5] {
    [
        BreakWindowAction::Show,
        BreakWindowAction::Unminimize,
        BreakWindowAction::Fullscreen,
        BreakWindowAction::AlwaysOnTop,
        BreakWindowAction::Focus,
    ]
}

#[tauri::command]
fn show_break_window(app: tauri::AppHandle) -> Result<(), String> {
    if let Some(w) = app.get_webview_window("main") {
        for action in enter_break_actions() {
            match action {
                BreakWindowAction::Show => w.show(),
                BreakWindowAction::Unminimize => w.unminimize(),
                BreakWindowAction::Fullscreen => w.set_fullscreen(true),
                BreakWindowAction::AlwaysOnTop => w.set_always_on_top(true),
                BreakWindowAction::Focus => w.set_focus(),
            }
            .map_err(|e| e.to_string())?;
        }
    }
    Ok(())
}

#[tauri::command]
fn hide_break_window(app: tauri::AppHandle) -> Result<(), String> {
    if let Some(w) = app.get_webview_window("main") {
        let _ = w.set_always_on_top(false);
        w.set_fullscreen(false).map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn entering_a_break_restores_and_raises_the_window_before_focusing_it() {
        assert_eq!(
            enter_break_actions(),
            [
                BreakWindowAction::Show,
                BreakWindowAction::Unminimize,
                BreakWindowAction::Fullscreen,
                BreakWindowAction::AlwaysOnTop,
                BreakWindowAction::Focus,
            ]
        );
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .invoke_handler(tauri::generate_handler![show_break_window, hide_break_window])
        .setup(|app| {
            let _ = app.get_webview_window("main");
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Focus Balance");
}

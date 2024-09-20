// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde::{Deserialize, Serialize};
use std::fs;
use std::io::Write;

#[derive(Serialize, Deserialize, Debug)]
struct User {
    id: u32,
    name: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Data {
    users: Vec<User>,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn read_json() -> Result<Data, String> {
    let file = fs::File::open("./data.json").map_err(|e| e.to_string())?;
    let data: Data = serde_json::from_reader(file).map_err(|e| e.to_string())?;
    Ok(data)
}

fn write_json(data: &Data) -> Result<(), String> {
    let json_data =
        serde_json::to_string_pretty(data).map_err(|_| "Error serializing data".to_string())?;
    let mut file =
        fs::File::create("./data.json").map_err(|_| "Unable to create file".to_string())?;
    file.write_all(json_data.as_bytes()).map_err(|_| "Error writing to file".to_string())?;
    Ok(())
}

#[tauri::command]
fn get_users() -> Result<Data, String> {
    Ok(read_json()?)
}

#[tauri::command]
fn add_user(id: u32, name: String) -> Result<String, String> {
    let mut data = read_json()?;
    let new_user = User { id, name };
    data.users.push(new_user);
    write_json(&data)?;
    Ok("User added successfully".to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_users, add_user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

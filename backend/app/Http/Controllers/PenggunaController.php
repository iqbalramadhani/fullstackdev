<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


class PenggunaController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function index(){

        $pengguna = DB::table('t_user')->get();

        return response()->json($pengguna);
    }

    public function find($id){
        $find = DB::table('t_user')->where(['id_user'=>$id])->get();
        if(count($find)>0){
            $response = [
                'status' => true,
                'data' => $find
            ]; 
        }else{
            $response = [
                'status' => false,
                'message' => 'Data tidak ditemukan !'
            ]; 
        }
        return response()->json($response);

    }

    public function store(Request $request){
        DB::beginTransaction();
        try {
            DB::table('t_user')->insert([
                'nama_user' => $request->input('nama_user'),
                'pesan' => $request->input('pesan'),
                'email' => $request->input('email'),
            ]);
            DB::commit();
            return [
                'status' => true,
                'message' => 'Data berhasil di simpan'
            ];
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
        }
    }

    public function update(Request $request,$id){
        DB::beginTransaction();
        try {
            DB::table('t_user')
                ->where('id_user',$id)
                ->update($request->input());
            DB::commit();
            return [
                'status' => true,
                'message' => 'Data berhasil di ubah'
            ];
        } catch (\Throwable $th) {
            DB::rollback();;
            throw $th;
        }
    }

    public function destroy($id){
        DB::beginTransaction();
        try {
            DB::table('t_user')->where('id_user',$id)
                ->delete();
            DB::commit();
            return [
                'status' => true,
                'message' => 'Data berhasil di hapus'
            ];
        } catch (\Throwable $th) {
            DB::rollback();;
            throw $th;
        }
    }
}

<div class="col-md-6">
            
    <div class="row">
        <h4 class="text-center">Aprobar Usuarios</h4>
    </div>

    <table class="table" style="width: 100%;">
        <thead>
            <tr>
                <th scope="col">NOMBRE</th>
                <th scope="col">EMAIL</th>
                <th scope="col">ACCIÓN</th>
            </tr>
        </thead>
        <tbody>
            @foreach( $users as $user )
                <tr>
                    <td>{{ $user->name }}</th>
                    <td>{{ $user->email }}</td>
                    <td>
                        <div class="row">
                            <div class="col-md-6">
                                <a href="{{ route( 'user-status', [$user->id,1] ) }}"><button class="btn">Aceptar</button></a>
                            </div>
                            <div class="col-md-6">
                                <a href="{{ route( 'user-status', [$user->id,2] ) }}"><button class="btn btn-danger">Rechazar</button></a>
                            </div>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
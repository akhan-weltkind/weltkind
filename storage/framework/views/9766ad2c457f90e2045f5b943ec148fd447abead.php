<?php $__env->startSection('th'); ?>
    <th><?php echo \Kyslik\ColumnSortable\SortableLink::render(array ('slug', ' Адресное имя'));?></th>
    <th><?php echo \Kyslik\ColumnSortable\SortableLink::render(array ('title', ' Название'));?></th>
    <th>Управление</th>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('td'); ?>
    <?php $__currentLoopData = $entities; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $entity): $__env->incrementLoopIndices(); $loop = $__env->getFirstLoop(); ?>
        <tr <?php if(!$entity->published): ?> class="unpublished" <?php endif; ?>>
            <td><?php echo e($entity->slug); ?></td>
            <td><?php echo e($entity->title); ?></td>
            <td class="controls"><?php echo $__env->make('admin::common.controls.all', ['routePrefix'=>$routePrefix, 'id'=>$entity->id], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?></td>
        </tr>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getFirstLoop(); ?>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('admin::admin.index', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>